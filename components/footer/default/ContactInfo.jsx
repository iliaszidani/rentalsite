const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Phone",
      action: "tel:+212661327367",
      text: "+(212) 6 61 32 73 67",
    },
    {
      id: 2,
      title: "Mail",
      action: "mailto:elkhalifi@rental365.com",
      text: "elkhalifi@rental365.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-blue-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
