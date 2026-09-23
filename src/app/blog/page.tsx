import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog-data";
import ScrollReveal from "@/components/ScrollReveal";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog, Family and Newborn Photo Tips",
  description:
    "Session guides, what to wear, when to book and the best photo locations in Skokie and Chicago's North Shore, from Tovy Photography.",
  alternates: {
    canonical: "https://tovyphotography.com/blog",
  },
  openGraph: {
    title: "Blog | Tovy Photography",
    description:
      "Photography tips, session guides, and stories from Skokie family photographer Tovy Photography.",
    url: "https://tovyphotography.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tovy Photography Blog",
    description:
      "Photography tips, session guides, and behind-the-scenes stories from Tovy Photography in Skokie, IL.",
    url: "https://tovyphotography.com/blog",
    author: {
      "@type": "Person",
      name: "Gabi Tovy",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#E8D5CE] px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-4 text-charcoal">
            Blog
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg">
            Tips, guides, and stories to help you get the most from your photo sessions
          </p>
        </div>
      </section>

      {/* Blog content */}
      <section className="px-6 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal mb-4">
                Coming Soon
              </p>
              <p className="text-charcoal-light leading-relaxed max-w-lg mx-auto">
                We&apos;re working on helpful content about family photography,
                session tips, and more. Check back soon!
              </p>
            </div>
          ) : (
            <BlogList posts={posts} categories={categories} />
          )}
        </div>
      </section>
    </>
  );
}
