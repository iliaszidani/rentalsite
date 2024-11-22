"use client";
import { useTranslations } from "next-intl";
import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";

const Index = () => {
  const t = useTranslations('Common')
  const footerData = [
    {
      id: 1,
      title: t('Footer.informations'),
      menuList: [
        { name:  t('NavebarComponent.home'), routerPath: "/" },
        { name:  t('NavebarComponent.about'), routerPath: "/" },
        { name:  t('NavebarComponent.cars'), routerPath: "/" },
        { name:  t('NavebarComponent.contact'), routerPath: "/" },
    
      ],
    },
    {
      id: 2,
      title: t('Footer.support'),
      menuList: [
        
        { name: t('Footer.privacyPolicy'), routerPath: "/" },
        { name:t('Footer.Terms&Conditions'), routerPath: "/" },
        { name: t('Footer.siteMap'), routerPath: "/" },
      ],
    },
    // {
    //   id: 3,
    //   title: t('Footer.offres'),
    //   menuList: [
    //     { name: "Voitures services", routerPath: "/" },
    //     { name: "Activity Finder", routerPath: "/" },
    //     { name: "Offres", routerPath: "/" },
    //     { name: "Destinations", routerPath: "/" },
    //   ],
    // },
  ];
  
  return (
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{t('Footer.contactUs')}</h5>
              <ContactInfo t={t} />
            </div>
            {/* End col */}

            <FooterContent  footerDataContent={footerData} />
            {/* End footer menu content */}

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">Store</h5>
              <AppButton />
            </div>
          </div>
        </div>
        {/* End footer top */}

        <div className="py-20 border-top-light">
          <Copyright t={t} />
        </div>
        {/* End footer-copyright */}
      </div>
      {/* End container */}
    </footer>
  );
};

export default Index;
