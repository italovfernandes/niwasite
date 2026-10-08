import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy Portuguese routes → English (permanent)
      { source: "/loja", destination: "/shop", permanent: true },
      { source: "/loja/:path*", destination: "/shop/:path*", permanent: true },
      { source: "/produto/:path*", destination: "/product/:path*", permanent: true },
      { source: "/sobre", destination: "/about", permanent: true },
      { source: "/guias", destination: "/dossiers", permanent: true },
      { source: "/conta", destination: "/account", permanent: true },
      { source: "/busca", destination: "/search", permanent: true },
      { source: "/atendimento", destination: "/support", permanent: true },
      { source: "/atendimento/contato", destination: "/support/contact", permanent: true },
      { source: "/atendimento/envios", destination: "/support/shipping", permanent: true },
      { source: "/atendimento/trocas", destination: "/support/returns", permanent: true },
    ];
  },
};

export default nextConfig;
