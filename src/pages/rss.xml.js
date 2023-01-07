import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";

const postImportResult = import.meta.glob("./blog/**/*.{md,mdx}", {
  eager: true,
});
const items = Object.values(postImportResult)
  .sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  )
  .map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: post.frontmatter.pubDate,
  }));

export const get = () =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items,
  });
