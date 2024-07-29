const Faq = () => {
  const faqContent = [
    {
      id: 1,
      collapseTarget: "One",
      title: "Comment puis-je réserver une voiture sur rental 365 ?",
      content: `Pour réserver une voiture sur rental 365, il vous suffit de visiter notre site web, de choisir votre destination, de sélectionner les dates et heures de location, et de parcourir les options disponibles. Une fois que vous avez trouvé la voiture qui vous convient, cliquez sur "Réserver" et suivez les instructions pour finaliser votre réservation.`,
    },
    {
      id: 2,
      collapseTarget: "Two",
      title: "Quels documents dois-je fournir pour louer une voiture ?",
      content: `Vous devrez fournir un permis de conduire valide, une pièce d'identité (comme un passeport ou une carte d'identité), et une carte de crédit au nom du conducteur principal pour le dépôt de garantie.`,
    },
    {
      id: 3,
      collapseTarget: "Three",
      title: "Y a-t-il une limite d'âge pour louer une voiture ?",
      content: `Oui, l'âge minimum pour louer une voiture sur rental 365 est de 21 ans. Cependant, certaines catégories de véhicules peuvent avoir des restrictions d'âge spécifiques. Veuillez vérifier les conditions de location pour chaque voiture.`,
    },
    {
      id: 4,
      collapseTarget: "Four",
      title: "Quels sont les modes de paiement acceptés ?",
      content: `Nous acceptons les principales cartes de crédit (Visa, MasterCard, American Express) pour les paiements en ligne. Certaines locations peuvent également permettre le paiement par carte de débit. Vérifiez les options de paiement disponibles lors de la réservation.`,
    },
    {
      id: 5,
      collapseTarget: "Five",
      title: "Que faire en cas de panne ou d'accident ?",
      content: `En cas de panne ou d'accident, contactez immédiatement notre service d'assistance routière 24h/24 et 7j/7. Les numéros de téléphone d'urgence sont inclus dans votre contrat de location. Suivez les instructions fournies et assurez-vous de signaler tout incident dans les plus brefs délais.`,
    },
  ];
  return (
    <>
      {faqContent.map((item) => (
        <div className="col-12" key={item.id}>
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.collapseTarget}`}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i className="icon-plus" />
                <i className="icon-minus" />
              </div>
              <div className="button text-dark-1 text-start">{item.title}</div>
            </div>
            {/* End accordion button */}

            <div
              className="accordion-collapse collapse"
              id={item.collapseTarget}
              data-bs-parent="#Faq1"
            >
              <div className="pt-15 pl-60">
                <p className="text-15">{item.content}</p>
              </div>
            </div>
            {/* End accordion conent */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Faq;
