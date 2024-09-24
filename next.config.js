/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
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
          pathname: ':8000/photos/cars/images/**',
        },
      ],
    },
    // i18n: {
    //   locales: ['en-US', 'fr', 'nl-NL'],
    //   defaultLocale: 'en-US',
    // },
  };

 