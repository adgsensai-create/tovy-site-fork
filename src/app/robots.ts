import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/client-gallery", "/api/admin"],
    },
    sitemap: "https://tovyphotography.com/sitemap.xml",
  };
}
