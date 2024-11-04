import MainFilterSearchBox from "./MainFilterSearchBox";

const index = ({t}) => {
  return (
    <section className="masthead -type-3 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/general/auto.avif" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {t('title')}

              </h1>
              <p
                className="text-white mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
               <h6>      {t('titleDetails')}
               </h6>
              </p>
            </div>
            {/* End hero title */}

            <div
              className="masthead__tabs" 
              data-aos="fade-up" 
              data-aos-delay="200" 
            
            >
              <MainFilterSearchBox isHome={true} t={t}/>
            </div>
            {/* End tab-filter */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
