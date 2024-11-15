
'use client'

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

const LanguageMegaMenu = ({ textClass, t }) => {
  const languageContent = [

    { "id": 1, "language": "English", "country": "United Kingdom", "code": "en" },
    { "id": 2, "language": "Español", "country": "España", "code": "es" },
    { "id": 3, "language": "Français", "country": "France", "code": "fr" },
    { "id": 4, "language": "Italiano", "country": "Italia", "code": "it" },
    { "id": 5, "language": "العربية", "country": "المغرب", "code": "ar" },
    { "id": 6, "language": "Português", "country": "Portugal", "code": "pt" },
    { "id": 7, "language": "Deutsch", "country": "Deutschland", "code": "de" }
  ];
  const [localValue, setLocalValue] = useState('');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const dir = document.documentElement.getAttribute('dir');
    setDirection(dir);
  }, []);
  useEffect(() => {
    const cookieValue = Cookies.get('NEXT_LOCALE');
    // console.log("cookie ", cookieValue )
    setLocalValue(cookieValue || '');
  }, []);
  const [click, setClick] = useState(false);
  const router = useRouter();
 
  const curretLang = languageContent.find((e)=> e.code === localValue)
  // console.log("&& curretLang ", curretLang )

  const handleCurrency = () => setClick((prevState) => !prevState);


  const [selectedCountry, setSelectedCountry] = useState(  languageContent[0]);
  

  const handleItemClick = (item) => {
    const nextLocale = item.code;
    setSelectedCountry(item);

    // Get the current path
    const currentPath = window.location.pathname;
    console.log("*************************************");
    console.log("currentPath ", currentPath);
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    console.log("pathSegments before ", pathSegments);
    // Check if the first segment is a locale
    if (languageContent.some(lang => lang.code === pathSegments[0])) {
      console.log(true);
      pathSegments[0] = nextLocale;
    } else {
      console.log(false);
      pathSegments.unshift(nextLocale);
    }
    console.log("pathSegments after ", pathSegments);
    
    const newPath = `/${pathSegments.join('/')}`;
    console.log("*************************************");

    // Navigate to the new path
    router.replace(newPath);
    setClick(false);
  };

  return (
    <>
      {/* Start language currency Selector */}
      <div className="col-auto">
     
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <Image
            width={20}
            height={20}
            src={`/img/general/lang/lang_${ curretLang?.code || selectedCountry.code}.png`}
            alt={`${ curretLang?.code || selectedCountry.code}`}
            className={`rounded-full ${direction === 'ltr' ? 'mr-10' : 'ml-10'}`}  
          />
          <span className="js-language-mainTitle">
            {" "}
            { curretLang?.language || selectedCountry.language}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-15" />
        </button>
      </div>
      {/* End language currency Selector */}

      <div className={`langMenu js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="langMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">{t("selectLangugage")}</div>
            {/* End title */}
            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* Emd flex-wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {languageContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  curretLang?.country  === item.country ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </div>
                  <div className="text-14 lh-15 mt-5 js-title">
                    {item.country}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMegaMenu;

/*

const [selectedCountry, setSelectedCountry] = useState(languageContent[0]);
useEffect(() => {
  if (router.isReady) {
    // Code using query
    console.log("aaaaaaa" ,router.query);
  }
}, [router.isReady]);
const handleItemClick = (item) => {
  const nextLocale = item.code;
  setSelectedCountry(item);
  console.log("router.path: ", router.path);


  startTransition(() => {
    const currentPath = router.asPath || ''; // Fallback to an empty string if undefined
    const newPath = `/${nextLocale}${currentPath.replace(/^\/[a-z]{2}/, `/${nextLocale}`)}`;
    
    // Navigate to the new path
    router.replace(newPath);
  });

  // Navigate to the new path
  router.replace(newPath);
  setClick(false);
};
*/