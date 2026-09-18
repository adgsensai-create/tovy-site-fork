import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  blogPosts,
} from "@/lib/blog-data";
import { faqJsonLd } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle
      ? { absolute: post.seoTitle }
      : `${post.title} | Tovy Photography Blog`,
    description:
      post.seoDescription || post.excerpt,
    alternates: {
      canonical: `https://tovyphotography.com/blog/${slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://tovyphotography.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Gabi Tovy"],
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Gabi Tovy",
    },
    publisher: {
      "@type": "Organization",
      name: "Tovy Photography",
      url: "https://tovyphotography.com",
    },
    url: `https://tovyphotography.com/blog/${slug}`,
    ...(post.image && {
      image: `https://tovyphotography.com${post.image}`,
    }),
  };

  const faqLd = post.faqs && post.faqs.length ? faqJsonLd(post.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-rose/15 pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-charcoal-light">
            <Link href="/blog" className="hover:text-sage-dark transition-colors">
              Blog
            </Link>
            <span className="mx-2">›</span>
            <span className="text-charcoal">{post.category}</span>
          </nav>

          {/* Header */}
          <header>
            <p className="text-xs font-medium uppercase tracking-wider text-sage mb-4">
              {post.category} · {formatDate(post.date)}
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
              {post.title}
            </h1>
          </header>
        </div>
      </section>

      {/* Article */}
      <article className="px-6 py-12 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Content */}
          <div
            className="max-w-none text-charcoal-light leading-relaxed text-base md:text-lg
              [&_h2]:font-[family-name:var(--font-cormorant)] [&_h2]:text-charcoal [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:mt-12 [&_h2]:mb-4
              [&_h3]:font-[family-name:var(--font-cormorant)] [&_h3]:text-charcoal [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-6 [&_a]:text-sage-dark [&_a]:underline
              [&_img]:rounded-sm [&_img]:my-8
              [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 bg-[#E8D5CE]/30 text-center rounded-sm">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal mb-3">
              Ready to book your session?
            </p>
            <p className="text-charcoal-light mb-6 text-sm">
              I&apos;d love to capture your family&apos;s story.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
            >
              Get in Touch
            </Link>
          </div>

          {/* Prev/Next navigation */}
          {(prevPost || nextPost) && (
            <div className="mt-16 pt-8 border-t border-charcoal/10 grid grid-cols-2 gap-8">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group">
                  <p className="text-xs uppercase tracking-wider text-charcoal-light mb-1">
                    ← Previous
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-charcoal group-hover:text-sage-dark transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group text-right"
                >
                  <p className="text-xs uppercase tracking-wider text-charcoal-light mb-1">
                    Next →
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-charcoal group-hover:text-sage-dark transition-colors">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
