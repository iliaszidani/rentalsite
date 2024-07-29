import dynamic from "next/dynamic";
import Footer6 from "@/components/footer/footer-6";
import Header8 from "@/components/header/header-8";
import Hero8 from "@/components/hero/hero-8";
import BlockGuide from "@/components/home/home-8/BlockGuide";
import Testimonial from "@/components/testimonial/Testimonial";
import CounterDark from "@/components/counter/CounterDark";
import Brand from "@/components/brand/Brand";
import PopularCars from "@/components/home/home-8/PopularCars";
import TopDestinations from "@/components/home/home-8/TopDestinations";
import Counter4 from "@/components/counter/Counter4";
import Faq from "@/components/faq/Faq";
import AppBanner from "@/components/home/home-8/AppBanner";
import Blog from "@/components/home/home-8/Blog";
import Link from "next/link";
import Hero3 from "@/components/hero/hero-3";
import Header3 from "@/components/header/header-3";
import PopularDestinations from "@/components/destinations/PopularDestinations";
import FilterHotels4 from "@/components/hotels/FilterHotels4";
import DefaultFooter from "@/components/footer/default";
import CallToActions from "@/components/common/CallToActions";

export const metadata = {
  title: "Home-8 || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const home_8 = () => {
  return (
    <>
      {/* End Page Title */}

      <Header3 />
      {/* End Header 8 */}

      <Hero3 />
      {/* End Hero 8 */}
      
      
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Pourquoi nous choisir?</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Nous nous engageons à fournir des véhicules de qualité et un service exceptionnel !
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-40 sm:pt-20">
            <BlockGuide />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Chercher par catégorie </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <FilterHotels4 />
        </div>
        {/* End .container */}
      </section>



      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Destinations</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Ces destinations populaires ont beaucoup à offrir !
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40">
          <PopularDestinations />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* Top Destinations Sections */}

      

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-xl-5 col-lg-6">
              <h2 className="text-30 fw-600">
              BIENVENUE À L'AGENCE DE LOCATION RENTAL 365
              </h2>
              <p className="mt-40 lg:mt-20">
               Explorez Rental 365, la plateforme de réservation de location de voitures de renommée mondiale,
               offrant une expérience exceptionnelle à ses utilisateurs.
               Découvrez pourquoi des milliers de clients choisissent RENTAL 365 pour leurs voyages et leurs déplacements.
              </p>

              <div className="d-inline-block mt-40 lg:mt-20">
                <a href="http://localhost:3000/about" className="button -md -blue-1 bg-dark-1 text-white">
                  Plus <div className="icon-arrow-top-right ml-15"></div>
                </a>
              </div>
            </div>
            {/* End .col */}

            <div className="col-xl-5 col-lg-6">
              <div className="shadow-4">
                <div className="row border-center">
                  <Counter4 />
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
      {/* End testimonial section */}

      <AppBanner />

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                FAQ - Questions Fréquemment Posées
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                Tout ce que vous devez savoir pour une location sans soucis
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 justify-center pt-40 sm:pt-20">
            <div className="col-xl-8 col-lg-10">
              <div
                className="accordion -simple row y-gap-20 js-accordion"
                id="Faq1"
              >
                <Faq />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      <CallToActions />
      {/* End faq section block */}

      <DefaultFooter />
      {/* End Footer Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(home_8), { ssr: false });
