// import Script from "next/script";
// import Wrapper from "@/components/layout/Wrapper";
// import MainHome from "../app/(homes)/home_1/page";

// export const metadata = {
//   title: "RENTAL 365°",
//   description: "GoTrip - Travel & Tour React NextJS Template",
// };

// export default function Home() {
//   // Function to initialize the Google Translate widget

//   return (
//     <>
//       <Wrapper>
//         <MainHome />

//         {/* The Google Translate dropdown will be inserted here */}
//         <div id="google_translate_element" style={{ padding: "20px", backgroundColor: "#f0f0f0" }}></div>

//         {/* User guide for translation */}
//         <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
//           Select a language from the dropdown above to translate this page.
//         </p>
//       </Wrapper>

//       {/* Script to load the Google Translate API */}
//       <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
//     </>
//   );
// }

import Wrapper from "@/components/layout/Wrapper";
import MainHome from "./(homes)/home/page";

export const metadata = {
  title: "RENTAL 365°",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

export default function Home() {
  return (
    <>
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
