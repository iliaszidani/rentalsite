import { NextIntlClientProvider } from 'next-intl';
import { getDictionary } from './dictionaries';
import ClientProvider from '../../components/common/ClientProvider';
import "../../styles/index.scss";
import SrollTop from "../../components/common/ScrollTop";

// Ensure this is not a 'use client' component, since we need server-side fetching
export default async function RootLayout({ children, params }) {
  const { locale } = params;

  // console.log("------lo----------------" + locale + "------------------------------");
  
  const direction = locale ==='ar' ? "rtl" : "ltr";
  // Fetch locale-specific messages
  const messages = await getDictionary(locale);

  return (
    <html lang={locale} dir={direction} >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        {/* Wrap with NextIntlClientProvider for internationalization */}
        <NextIntlClientProvider messages={messages}>
          {/* Redux Provider */}
          <ClientProvider>
            {children}
            <SrollTop />
          </ClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
