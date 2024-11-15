"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import BlockGuide from "@/components/home/home-8/BlockGuide";

import Counter4 from "@/components/counter/Counter4";
import Faq from "@/components/faq/Faq";
import AppBanner from "@/components/home/home-8/AppBanner";

import Hero3 from "@/components/hero/hero-3";
import Header3 from "@/components/header/header-3";
import PopularDestinations from "@/components/destinations/PopularDestinations";

import DefaultFooter from "@/components/footer/default";
import CallToActions from "@/components/common/CallToActions";
import FilterHotels2 from "@/components/hotels/FilterHotels2";

import { fetchCars } from "@/features/car/thunk";
import { useDispatch, useSelector } from "react-redux";

import { useTranslations } from "next-intl";
import Link from "next/link";
// import {Link} from '@/i18n/routing';
const home = () => {
  const t = useTranslations("HomePage");
  const dispatch = useDispatch();

  
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const dir = document.documentElement.getAttribute('dir');
    setDirection(dir);
  }, []);


  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/2/1.svg",
      title: t("WhyUsSection.CompetitiveRates"), // Traduction dynamique pour le titre
      text: t("WhyUsSection.FlexiblePricing"), // Traduction dynamique pour le texte
      delayAnim: "100",
    },
    {
      id: 2,
      icon: "/img/featureIcons/2/2.svg",
      title: t("WhyUsSection.WideSelection"),
      text: t("WhyUsSection.DiverseQuality"),
      delayAnim: "300",
    },
    {
      id: 3,
      icon: "/img/featureIcons/2/3.svg",
      title: t("WhyUsSection.ExceptionalService"),
      text: t("WhyUsSection.ServiceQuality"),
      delayAnim: "500",
    },
  ];

  const blockContentCounter = [
    {
      id: 1,
      number: "751",
      meta: t("Destinations.Statistics.destinations"),
      hasUnit: "",
      delayAnim: "100",
    },
    {
      id: 2,
      number: "200",
      meta: t("Destinations.Statistics.properties"),
      hasUnit: "",
      delayAnim: "200",
    },
    {
      id: 3,
      number: "800",
      meta: t("Destinations.Statistics.clients"),
      hasUnit: "",
      delayAnim: "300",
    },
    {
      id: 4,
      number: "90",
      meta: t("Destinations.Statistics.cars"),
      hasUnit: "%",
      delayAnim: "400",
    },
  ];
  const faqContent = [
    {
      id: 1,
      collapseTarget: "One",
      title: t("FAQSection.One.title"),
      content: t("FAQSection.One.content"),
    },
    {
      id: 2,
      collapseTarget: "Two",
      title: t("FAQSection.Two.title"),
      content: t("FAQSection.Two.content"),
    },
    {
      id: 3,
      collapseTarget: "Three",
      title: t("FAQSection.Three.title"),
      content: t("FAQSection.Three.content"),
    },
    {
      id: 4,
      collapseTarget: "Four",
      title: t("FAQSection.Four.title"),
      content: t("FAQSection.Four.content"),
    },
    {
      id: 5,
      collapseTarget: "Five",
      title: t("FAQSection.One.title"),
      content: t("FAQSection.One.content"),
    },
  ];
  const { filteredCars, isLoading } = useSelector((state) => state.car);
  // console.log("H 9 ", filteredCars);

  return (
    <>
      {/* End Page Title */}
      <Header3 />
      {/* End Header 8 */}
      <Hero3 t={t} />
      {/* End Hero 8 */}
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  {" "}
                  {t("WhyUsSection.whyUs")}
                </h2>
                <div className=" sectionTitle__text mt-5 sm:mt-0">
                  {t("WhyUsSection.whyUsResponse")}
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
          <div className="row y-gap-40 justify-between pt-40 sm:pt-20">
            <BlockGuide content={blockContent} />
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
                <h2 className="sectionTitle__title">
                  {t("CarsByBrandSection.title")}{" "}
                </h2>
                <div className=" sectionTitle__text mt-5 sm:mt-0"></div>
              </div>
            </div>
          </div>
          {/* End .row */}
          {!isLoading ? <FilterHotels2 cars={filteredCars} t={t} /> : "...Loading"}
        </div>
        {/* End .container */}
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  {" "}
                  {t("Destinations.title")}
                </h2>
                <div className=" sectionTitle__text mt-5 sm:mt-0">
                  {t("Destinations.desc")}
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
          <div className="row y-gap-30 pt-40">
            <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
              <PopularDestinations t={t} />
            </div>
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
                {t("Destinations.welcomeTitle")}
              </h2>
              <div className="mt-40 lg:mt-20">
                {t("Destinations.welcomeDetails")}
              </div>
              <div className="d-inline-block mt-40 lg:mt-20">
                <Link
                  href="http://localhost:3000/about"
                  className="button -md -blue-1 bg-dark-1 text-white"
                >
                  {t("Destinations.more")}{" "}
                  <div
                    className={` ${
                      direction === "ltr"
                        ? "ml-15  icon-arrow-top-right "
                        : "mr-15  icon-arrow-top-right "
                    }`}
                  ></div>
                </Link>
              </div>
            </div>
            {/* End .col */}
            <div className="col-xl-5 col-lg-6">
              <div className="shadow-4">
                <div className="row border-center">
                  <Counter4 content={blockContentCounter} />
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
      <AppBanner t={t} />
      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">{t("FAQSection.title")}</h2>
                <div className=" sectionTitle__text mt-5 sm:mt-0">
                  {t("FAQSection.desc")}
                </div>
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
                <Faq content={faqContent} />
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

export default dynamic(() => Promise.resolve(home), { ssr: false });
