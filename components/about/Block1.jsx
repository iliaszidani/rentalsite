import Image from "next/image";

const Block1 = () => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">BIENVENUE À L’AGENCE DE LOCATION RENTAL 365</h2>
        <p className="mt-5">RENTAL 365 La plateforme leader mondial de réservation de location de voitures </p>
        <p className="text-dark-1 mt-60 lg:mt-40 md:mt-20">
     

  L’agence de location de voiture Rental 365, n’a cessé de se développer grâce à une politique de qualité rigoureuse et d’évolution permanente.
<br></br>
L’activité de Rental 365 est basée sur la location courte et longue durée de véhicules au profit des particuliers et des sociétés.
<br></br>
L’agence de location de voiture Rental 365 a su s’imposer sur le marché marocain par son professionnalisme, sa qualité de service, ainsi qu’un excellent rapport qualité prix.

<br></br>
- Ponctualité, rigueur, sérieux sont les maîtres mots qui caractérisent le développement de la société Rental 365.
<br></br>

- La ponctualité est une valeur clé de Rental 365, ce qui signifie que l'agence s'efforce d'être à l'heure pour la livraison et la récupération des véhicules loués. Cela garantit aux clients qu'ils peuvent compter sur l'agence pour respecter leurs engagements en matière de temps et de planification.





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
