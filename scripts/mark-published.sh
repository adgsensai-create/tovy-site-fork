#!/bin/bash
# Marks queue items "published" when their content/<slug> pull request has been merged.
# Edits content/queue.json in the working tree only. It never commits or pushes;
# weekly-page.sh commits the change on the next content branch so it reaches main
# through a reviewed PR like everything else.
#
# Usage: scripts/mark-published.sh [--quiet]
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
QUEUE="$REPO_DIR/content/queue.json"
GH_REPO="${GH_REPO:-tovypics-cell/gabi-photography-site}"
QUIET=0
[ "${1:-}" = "--quiet" ] && QUIET=1

say() { [ "$QUIET" = 1 ] || echo "mark-published: $*"; }

GH_BIN="${GH_BIN:-$(command -v gh || true)}"
[ -z "$GH_BIN" ] && [ -x "$HOME/.local/bin/gh" ] && GH_BIN="$HOME/.local/bin/gh"
if [ -z "$GH_BIN" ]; then
  echo "mark-published: gh (GitHub CLI) not found, cannot read merged PRs" >&2
  exit 1
fi
[ -f "$QUEUE" ] || { echo "mark-published: $QUEUE not found" >&2; exit 1; }

# Merged PRs whose head branch is content/<slug>. Dry-run branches look like
# content/<slug>--dry-run-<stamp>; if one of those gets merged, the page is live,
# so it counts as published for <slug> too.
merged="$("$GH_BIN" pr list --repo "$GH_REPO" --state merged --limit 200 \
  --json number,headRefName,mergedAt \
  --jq '[.[] | select(.headRefName | startswith("content/"))
         | {slug: (.headRefName | ltrimstr("content/") | sub("--dry-run-.*$"; "")),
            pr: .number, mergedAt: .mergedAt}]')"

tmp="$(mktemp)"
jq --argjson merged "$merged" '
  .items |= map(
    . as $item
    | ([$merged[] | select(.slug == $item.slug)] | sort_by(.mergedAt) | last) as $m
    | if $m != null and $item.status != "published"
      then . + {status: "published", pr: $m.pr, publishedAt: ($m.mergedAt | .[0:10])}
      else . end)
' "$QUEUE" > "$tmp"

if cmp -s "$tmp" "$QUEUE"; then
  rm -f "$tmp"
  say "nothing new to mark"
else
  changed="$(jq -r --slurpfile old "$QUEUE" '
    [.items[] | select(.status == "published") | .slug] -
    [$old[0].items[] | select(.status == "published") | .slug] | join(", ")' "$tmp")"
  mv "$tmp" "$QUEUE"
  say "marked published: $changed"
fi
