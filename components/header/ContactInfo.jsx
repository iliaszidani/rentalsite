const ContactInfo = ({t}) => {
  const contactContent = [
    {
      id: 1,
      title: t("customerCare"),
      action: "tel:+(212) 6 61 32 73 67", // change it to contact number
      text: "+(212) 6 61 32 73 67",
    },
    {
      id: 2,
      title: t("needSupport"),
      action: "mailto:support@rental365.ma",
      text: "support@rental365.ma",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mb-20" key={item.id} >
          <div className={"text-14"} >{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-dark-1 mt-5" dir="ltr">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
