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
  };



