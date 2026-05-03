const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/design", destination: "/projects", permanent: true }];
  },
};

export default nextConfig;
