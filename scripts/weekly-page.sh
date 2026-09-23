#!/bin/bash
# Weekly content loop for tovyphotography.com.
#
# Writes the next "queued" page from content/queue.json on a content/<slug> branch,
# opens a pull request, and texts Gabi the link. It never deploys and never pushes
# to main. Publishing is a human merging the PR.
#
# Usage:
#   scripts/weekly-page.sh              normal weekly run (launchd, Mondays 9:00)
#   scripts/weekly-page.sh --dry-run    full run, but the queue item stays "queued"
#                                       and the PR is a draft on a --dry-run- branch
#   scripts/weekly-page.sh --base BR    start from branch BR instead of main
#
# Local settings (not in git): ~/.config/tovy-weekly/env
#   IMESSAGE_TO=...                 phone number or Apple ID email to text
#   CLAUDE_CODE_OAUTH_TOKEN=...     from `claude setup-token`, so launchd can run claude
#   CLAUDE_BIN=... / GH_BIN=...     optional overrides
set -euo pipefail

# Run from a temp copy: this script lives in the repo and `git checkout` below can
# rewrite it on disk while bash is still reading it.
if [ -z "${TOVY_WEEKLY_COPY:-}" ]; then
  src="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
  tmpdir="$(mktemp -d "${TMPDIR:-/tmp}/tovy-weekly.XXXXXX")"
  cp "$src" "$tmpdir/weekly-page.sh"
  TOVY_WEEKLY_COPY="$tmpdir" exec /bin/bash "$tmpdir/weekly-page.sh" "$@"
fi

REPO="/Users/gabiamrami/gabi-photography-site"
GH_REPO="tovypics-cell/gabi-photography-site"
CONFIG="$HOME/.config/tovy-weekly/env"
QUEUE="content/queue.json"
PROMPT_FILE="scripts/weekly-page-prompt.md"
RUN_DIR=".content-run"
LOCK="$HOME/.cache/tovy-weekly-page.lock"
export PATH="/Users/gabiamrami/.local/node/bin:$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

DRY_RUN=0
BASE="main"
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    --base) BASE="${2:?--base needs a branch}"; shift ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "unknown option: $1" >&2; exit 2 ;;
  esac
  shift
done

log() { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

# shellcheck disable=SC1090
[ -f "$CONFIG" ] && set -a && . "$CONFIG" && set +a

notify() {
  local msg="$1"
  if [ -z "${IMESSAGE_TO:-}" ]; then
    log "IMESSAGE_TO not set in $CONFIG, skipping iMessage: $msg"
    return 0
  fi
  /usr/bin/osascript - "$IMESSAGE_TO" "$msg" <<'OSA' >/dev/null || log "iMessage send failed"
on run argv
  set theTarget to item 1 of argv
  set theText to item 2 of argv
  tell application "Messages"
    set svc to 1st account whose service type = iMessage
    send theText to participant theTarget of svc
  end tell
end run
OSA
}

STAGE="startup"
finish() {
  local code=$?
  rm -rf "$LOCK" "${TOVY_WEEKLY_COPY:-/nonexistent}"
  if [ "$code" -ne 0 ]; then
    log "FAILED during: $STAGE (exit $code)"
    notify "Tovy weekly page FAILED during $STAGE. Log: ~/Library/Logs/tovy-weekly-page.log"
  fi
}
die() { log "ERROR: $*"; exit 1; }

# ---------- preflight ----------
mkdir -p "$(dirname "$LOCK")"
mkdir "$LOCK" 2>/dev/null || { log "another run is in progress ($LOCK), exiting"; exit 0; }
trap finish EXIT

log "==== weekly page run (dry_run=$DRY_RUN base=$BASE) ===="
STAGE="preflight"
if [ -z "${CLAUDE_BIN:-}" ]; then
  CLAUDE_BIN="$(ls -d "$HOME/Library/Application Support/Claude/claude-code/"*/claude.app/Contents/MacOS/claude 2>/dev/null | sort -V | tail -1 || true)"
  [ -n "$CLAUDE_BIN" ] || CLAUDE_BIN="$(command -v claude || true)"
fi
[ -x "${CLAUDE_BIN:-}" ] || die "claude CLI not found (set CLAUDE_BIN in $CONFIG)"
GH_BIN="${GH_BIN:-$(command -v gh || true)}"
[ -x "${GH_BIN:-}" ] || die "gh (GitHub CLI) not found (install it, then run: gh auth login)"
"$GH_BIN" auth status >/dev/null 2>&1 || die "gh is not logged in (run: gh auth login)"
export GH_BIN GH_REPO
command -v jq >/dev/null || die "jq not found"
log "claude: $CLAUDE_BIN"

cd "$REPO"
[ -z "$(git status --porcelain)" ] || die "working tree has uncommitted changes, not touching it"

# ---------- sync base ----------
STAGE="git sync"
git checkout -q "$BASE"
git pull -q --ff-only origin "$BASE"
[ -f "$QUEUE" ] && [ -f "$PROMPT_FILE" ] || die "$QUEUE or $PROMPT_FILE missing on $BASE"
BASE_SHA_REMOTE="$(git rev-parse "origin/$BASE")"

# ---------- mark merged pages as published ----------
STAGE="mark-published"
/bin/bash scripts/mark-published.sh

# ---------- pick the item ----------
STAGE="pick item"
item="$(jq -c '[.items[] | select(.status == "queued")][0] // empty' "$QUEUE")"
if [ -z "$item" ]; then
  git checkout -q -- "$QUEUE"
  log "no queued items, nothing to do"
  notify "Tovy weekly page: the content queue is empty. Add pages to content/queue.json."
  exit 0
fi
SLUG="$(jq -r .slug <<<"$item")"
TYPE="$(jq -r .type <<<"$item")"
KEYWORD="$(jq -r .primaryKeyword <<<"$item")"
SOURCE_DRAFT="$(jq -r '.sourceDraft // "null"' <<<"$item")"
log "item: $SLUG ($TYPE) keyword=\"$KEYWORD\" draft=$SOURCE_DRAFT"

if [ "$DRY_RUN" = 1 ]; then
  BRANCH="content/$SLUG--dry-run-$(date +%Y%m%d%H%M)"
else
  BRANCH="content/$SLUG"
fi
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  die "branch $BRANCH already exists on GitHub. Merge or close its PR and delete the branch."
fi

git checkout -q -b "$BRANCH"
if ! git diff --quiet -- "$QUEUE"; then
  git commit -q -m "Queue: mark merged content pages as published" -- "$QUEUE"
  log "committed published-status updates"
fi
START_SHA="$(git rev-parse HEAD)"

# ---------- write the page with claude ----------
STAGE="claude"
rm -rf "$RUN_DIR" && mkdir -p "$RUN_DIR"
SUMMARY="$RUN_DIR/summary.json"
{
  cat "$PROMPT_FILE"
  printf '\n\n## Run parameters\n\n'
  printf -- '- SLUG: %s\n- TYPE: %s\n- PRIMARY_KEYWORD: %s\n- SOURCE_DRAFT: %s\n' "$SLUG" "$TYPE" "$KEYWORD" "$SOURCE_DRAFT"
  printf -- '- TARGET: %s\n' "$(jq -c '.target // null' <<<"$item")"
  printf -- '- DRY_RUN: %s\n- TODAY: %s\n- SUMMARY_PATH: %s\n' "$DRY_RUN" "$(date +%Y-%m-%d)" "$SUMMARY"
} > "$RUN_DIR/prompt.md"

log "running claude (transcript: $REPO/$RUN_DIR/claude.log)"
"$CLAUDE_BIN" -p \
  --permission-mode acceptEdits \
  --allowedTools "Read,Edit,Write,WebSearch,WebFetch,Bash(git *),Bash(npm run build)" \
  --max-turns 120 \
  < "$RUN_DIR/prompt.md" > "$RUN_DIR/claude.log" 2>&1 \
  || die "claude exited with an error (see $RUN_DIR/claude.log)"

# ---------- verify what claude did ----------
STAGE="verify"
[ "$(git rev-parse "origin/$BASE")" = "$BASE_SHA_REMOTE" ] && \
  [ "$(git ls-remote origin "refs/heads/$BASE" | cut -f1)" = "$BASE_SHA_REMOTE" ] \
  || die "origin/$BASE moved during the run. Check GitHub before doing anything else."
[ "$(git branch --show-current)" = "$BRANCH" ] || die "claude left the branch (now on $(git branch --show-current))"
[ -f "$SUMMARY" ] && jq -e . "$SUMMARY" >/dev/null || die "claude did not write a valid $SUMMARY"
STATUS="$(jq -r .status "$SUMMARY")"
if [ "$STATUS" != "ok" ]; then
  REASON="$(jq -r .reason "$SUMMARY")"
  [ -z "$(git status --porcelain)" ] || die "blocked ($REASON) and left uncommitted changes on $BRANCH"
  git checkout -q "$BASE"
  git branch -q -D "$BRANCH"
  log "blocked: $REASON"
  notify "Tovy weekly page skipped $SLUG: $REASON. It stays queued. Edit content/queue.json to fix or skip it."
  exit 0
fi
[ -z "$(git status --porcelain)" ] || die "claude left uncommitted changes on $BRANCH"
[ "$(git rev-list --count "$START_SHA..HEAD")" -ge 1 ] || die "claude reported ok but made no commit"

if git diff "$BASE...HEAD" -U0 -- src content | grep '^+' | grep -v '^+++' | grep -q $'\xe2\x80\x94'; then
  die "new content contains an em dash (brand rule). Fix on $BRANCH, then open the PR by hand."
fi

log "verifying build"
npm run build > "$RUN_DIR/build.log" 2>&1 || die "npm run build fails on $BRANCH (see $RUN_DIR/build.log)"

want_status="in_review"; [ "$DRY_RUN" = 1 ] && want_status="queued"
tmp="$(mktemp)"
jq --arg s "$SLUG" --arg st "$want_status" --arg br "$BRANCH" --arg d "$(date +%Y-%m-%d)" '
  .items |= map(if .slug == $s then
    (. + {status: $st, updatedAt: $d})
    | if $st == "queued" then . else . + {branch: $br} end
  else . end)' "$QUEUE" > "$tmp"
if [ "$DRY_RUN" = 1 ]; then
  # dry run: put this item back exactly as it was on the base branch
  jq --arg s "$SLUG" --slurpfile base <(git show "$BASE:$QUEUE") '
    .items |= map(if .slug == $s then ($base[0].items[] | select(.slug == $s)) else . end)' "$QUEUE" > "$tmp"
fi
if ! cmp -s "$tmp" "$QUEUE"; then
  mv "$tmp" "$QUEUE"
  git commit -q -m "Queue: set $SLUG to $want_status" -- "$QUEUE"
else
  rm -f "$tmp"
fi

# ---------- push + PR ----------
STAGE="push"
git push -q -u origin "$BRANCH"

STAGE="pull request"
TITLE="$(jq -r .title "$SUMMARY")"
URL_PATH="$(jq -r .url "$SUMMARY")"
if [ "$TYPE" = "rewrite" ]; then PR_TITLE="Rewrite: $TITLE"; else PR_TITLE="New $TYPE page: $TITLE"; fi
[ "$DRY_RUN" = 1 ] && PR_TITLE="[DRY RUN] $PR_TITLE"
{
  [ "$DRY_RUN" = 1 ] && printf '> **Dry run.** The queue item stays `queued`. Merging publishes the page and the next weekly run will mark it published. Close it instead if you only wanted to preview.\n\n'
  printf '**Primary keyword:** %s\n\n' "$KEYWORD"
  if [ "$TYPE" = "rewrite" ]; then
    printf '**Rewritten page:** `%s` (in `%s`). Same URL, same design, sharper copy and metadata.\n\n' "$URL_PATH" "$(jq -r .dataFile "$SUMMARY")"
  else
    printf '**New page:** `%s` (%s, in `%s`)\n\n' "$URL_PATH" "$TYPE" "$(jq -r .dataFile "$SUMMARY")"
  fi
  printf '**Vercel preview:** _paste preview URL here_\n\n'
  printf '### Pages it links to\n'
  jq -r '.linksTo[]? | "- `\(.)`"' "$SUMMARY"
  printf '\n### Pages that now link to it\n'
  jq -r '.linkedFrom[]? | "- `\(.page)` (\(.file))"' "$SUMMARY"
  if [ "$(jq '.sources | length' "$SUMMARY")" -gt 0 ]; then
    printf '\n### Cost sources quoted\n'
    jq -r '.sources[] | "- [\(.name)](\(.url))"' "$SUMMARY"
  fi
  printf '\n### Images used\n'
  jq -r '.images[]? | "- `\(.)`"' "$SUMMARY"
  notes="$(jq -r '.notes // ""' "$SUMMARY")"
  [ -n "$notes" ] && printf '\n### Notes from the writer\n%s\n' "$notes"
  printf '\n### Before merging\n- [ ] Read it out loud once. Does it sound like me?\n- [ ] Every number is from my pricing or a linked source\n- [ ] It only claims places I have really shot\n- [ ] The photos fit the topic\n'
  printf '\nMerging is the publish step. Nothing here was deployed.\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n'
} > "$RUN_DIR/pr-body.md"

draft=(); [ "$DRY_RUN" = 1 ] && draft=(--draft)
PR_URL="$("$GH_BIN" pr create --repo "$GH_REPO" --base "$BASE" --head "$BRANCH" \
  --title "$PR_TITLE" --body-file "$RUN_DIR/pr-body.md" ${draft[@]+"${draft[@]}"})"
PR_NUMBER="${PR_URL##*/}"
log "opened $PR_URL"

if [ "$DRY_RUN" = 0 ]; then
  STAGE="record PR number"
  tmp="$(mktemp)"
  jq --arg s "$SLUG" --argjson n "$PR_NUMBER" '.items |= map(if .slug == $s then . + {pr: $n} else . end)' "$QUEUE" > "$tmp"
  mv "$tmp" "$QUEUE"
  git commit -q -m "Queue: $SLUG is in review as PR #$PR_NUMBER" -- "$QUEUE"
  git push -q origin "$BRANCH"
fi

# ---------- tell Gabi ----------
STAGE="notify"
prefix=""; [ "$DRY_RUN" = 1 ] && prefix="[Dry run] "
notify "${prefix}New page ready to review: $TITLE
Keyword: $KEYWORD
$PR_URL"

git checkout -q "$BASE"
log "done: $PR_URL"
