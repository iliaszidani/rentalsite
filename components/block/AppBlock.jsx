import { useEffect, useState } from "react";

const AppBlock = ({t}) => {
  
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    const dir = document.documentElement.getAttribute('dir');
    setDirection(dir);
  }, []);

  return (
    <>
      <h2 className="text-30 lh-15">{t('DownloadAppSection.title')}</h2>
      <p className="text-dark-1 pr-40 lg:pr-0 mt-15 sm:mt-5">
      {t('DownloadAppSection.desc')}
      </p>

      <div className="row items-center pt-30 sm:pt-10 gap-2">
        <div className="col-auto">
          <div className="d-flex items-center px-20 py-10 rounded-8 border-white-15 text-white bg-dark-3">
            <div className="icon-apple text-24" />
            <div className={` ${direction==="ltr" ? "ml-20" :"mr-10" }`}  >
              <div className="text-14">{t('DownloadAppSection.download')}</div>
              <div className="text-15 lh-1 fw-500">{t('DownloadAppSection.Apple.store')}</div>
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="d-flex items-center px-20 py-10 rounded-8 border-white-15 text-white bg-dark-3">
            <div className="icon-play-market text-24" />
            <div className={` ${direction==="ltr" ? "ml-20" :"mr-10" }`} >
              <div className="text-14">{t('DownloadAppSection.download')}</div>
              <div className="text-15 lh-1 fw-500">{t('DownloadAppSection.Android.store')}</div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default AppBlock;
