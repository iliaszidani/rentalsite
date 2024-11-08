
'use client'

import Image from "next/image";
import Slider from "react-slick";
import { testimonial1 } from "../../data/testimonialData";
import userImage from "../../public/img/user.PNG"
import { useTranslations } from "next-intl";

const Testimonial = ( ) => {
  const t = useTranslations("AboutPage");
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };
  const googleTraductionStyle = {
    color:"#777d78",
    fontSize:"0.75em",
    textDecoration:"underline"
    
  };

  return (
    <>
      <Slider {...settings}>
        {testimonial1.map((item) => (
          <div
            className="testimonials -type-1 bg-white rounded-4 pt-40 pb-30 px-40"
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.dealyAnimation}
          >
            <h4 className="text-16 fw-500 text-blue-1 mb-20">{item.meta}</h4>
            <p className="testimonials__text lh-18 fw-500 text-dark-1">
              {item.text}
            </p>
            <span className="googleTraductionStyle">{t("Testimonial.translatedByGoogle")}</ span>
            <div className="pt-20 mt-28 border-top-light">
              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <Image
                    width={60}
                    height={60}
                    src={userImage}
                    alt="image"
                    className="size-60"
                  />
                </div>
                <div className="col-auto">
                  <div className="text-15 fw-500 lh-14">{item.name}</div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                   { true ? t("Testimonial.user_type_male") : t("Testimonial.user_type_female")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
