import Image from "next/image";

const Block1 = ({t}) => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">{t("Welcome.title")}</h2>
        <p className="mt-5">{t("Welcome.desc")}</p>
        <p className="text-dark-1 mt-60 lg:mt-40 md:mt-20">
     

   {t('Welcome.morrDesc.phrase_1')}
<br></br>
{t('Welcome.morrDesc.phrase_2')}
<br></br>
{t('Welcome.morrDesc.phrase_3')}

<br></br>
{t('Welcome.morrDesc.phrase_4')}
<br></br>

{t('Welcome.morrDesc.phrase_5')}





        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <Image
          width={400}
          height={400}
          src="/img/pages/about/about.jpg"
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
