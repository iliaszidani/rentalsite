/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home_8',
          permanent: true,
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '',
          pathname: '/car-rental-api/public/photos/cars/images/**',
        },
      ],
    },
  };



