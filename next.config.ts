import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  // optional
});

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default withMDX(nextConfig);

