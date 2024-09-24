import { useEffect } from "react";
import Script from "next/script";
import Wrapper from "@/components/layout/Wrapper";
import MainHome from "../app/(homes)/home_1/page";

export const metadata = {
  title: "RENTAL 365°",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

export default function Home() {
  // Function to initialize the Google Translate widget
  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Set your default page language
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Dropdown layout
          autoDisplay: false,
        },
        "google_translate_element" // The ID of the container where the widget will be rendered
      );
    }
  };

  useEffect(() => {
    // Create a script element to load the Google Translate script
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);

    // Assign the init function to the global window object
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <MainHome />

        {/* The Google Translate dropdown will be inserted here */}
        <div id="google_translate_element" style={{ padding: "20px", backgroundColor: "#f0f0f0" }}></div>

        {/* User guide for translation */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Select a language from the dropdown above to translate this page.
        </p>
      </Wrapper>

      {/* Script to load the Google Translate API */}
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
    </>
  );
}
