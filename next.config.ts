import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output:"standalone",
  images: {
    remotePatterns: [new URL('https://storage.googleapis.com/test_e_commerce/**')],
  },

    /* async redirects(){
      return [
          {
              source: '/myaccount/Auth/:path*',
              destination: '/myaccount/auth/:path*',
              permanent: false,
          }
      ]
    }*/
};


export default nextConfig;
//export default withFlowbiteReact(nextConfig);