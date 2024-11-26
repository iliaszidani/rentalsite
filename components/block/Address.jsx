import { useTranslations } from "next-intl";

const Address = () => {
  const t=useTranslations("contactUsPage");
  const addressContent = [
    {
      id: 1,
      colClass: "col-lg-3",
      title: t("ContactUs.address"),
      content: (
        <> {t("MapsTopBar.city") +", "+ t("MapsTopBar.country") + "."} </>
      ),
    },
    {
      id: 2,
      colClass: "col-auto",
      title: t("ContactUs.phone"),
      content: (
        <>
          <a href="tel:+(212) 6 61 32 73 67" dir="ltr">+(212) 6 61 32 73 67</a>
        </>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: t("ContactUs.needSupport"),
      content: (
        <>
          {" "}
          <a href="mailto:support@rental365.ma">support@rental365.ma</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <div className="text-14 text-light-1">{item.title}</div>
          <div className="text-18 fw-500 mt-10">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export default Address;
