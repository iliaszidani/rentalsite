const BlockGuide = ({content}) => {
  // const blockContent = [
  //   {
  //     id: 1,
  //     icon: "/img/featureIcons/2/1.svg",
  //     title: "Tarifs Compétitifs",
  //     text: `Que vous ayez besoin d'une voiture pour une journée ou pour un mois, nos tarifs s'adaptent à vos besoins spécifiques.`,
  //     delayAnim: "100",
  //   },
  //   {
      
  //     id: 2,
  //     icon: "/img/featureIcons/2/2.svg",
  //     title: "Large Sélection de Véhicules",
  //     text: `Mettez en avant la diversité et la qualité de votre flotte de véhicules.`,
  //     delayAnim: "300",
  //   },
  //   {
  //     id: 3,
  //     icon: "/img/featureIcons/2/3.svg",
  //     title: "Service Client Exceptionnel",
  //     text: `Mettez en avant la qualité de votre service client et comment vous vous assurez .`,
  //     delayAnim: "500",
  //   },
  // ];
 

  return (
    <>
      {content.map((item) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 -hover-shadow px-50 py-50 lg:px-24 lg:py-15">
            <div className="d-flex justify-center">
              <img src={item.icon} alt="image" className="js-lazy" />
            </div>
            <div className="text-center mt-30">
              <h4 className="text-18 fw-500">{item.title}</h4>
              <p className="text-15 mt-10">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockGuide;
