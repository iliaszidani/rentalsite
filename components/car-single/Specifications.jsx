import { useTranslations } from "next-intl";
// "make": "Marque",
// "model": "Modèle",
// "madeYear": "Année de fabrication",
// "firstNameRequired": "Le prénom est requis.",
// "lastNameRequired": "Le nom est requis.",
// "emailRequired": "L'e-mail est requis.",
// "emailInvalid": "Veuillez entrer un e-mail valide.",
// "phoneRequired": "Le numéro de téléphone est requis.",
// "phoneInvalid": "Veuillez entrer un numéro de téléphone valide.",
// "identityRequired": "La pièce d'identité est obligatoire.",
// "addressRequired": "L'adresse est requise.",
// "termsRequired": "Vous devez accepter les termes et conditions."
const Specifications = ({car}) => {
  const t=useTranslations();
  const speciContent = [
    { id: 1, name: t("carDetails.make"), content: car.car.brands.brand_name   },
    { id: 2, name: t("carDetails.model"), content: car.car.series?.serie_name },
    { id: 3, name:t("carDetails.madeYear"), content: car.car.year_of_manufacture  },
    { id: 4, name: t("carDetails.mileage"), content: car.car.mileage },
    // { id: 5, name: "Mileage", content: "120,556" },
    // { id: 6, name: "Version", content: "2.0 Turbo" },
    // { id: 7, name: "Horsepower (hp)", content: "200" },
    { id: 8, name:  t("carDetails.transmission"), content:car.car.transmission  },
    // { id: 9, name: "Condition", content: "New" },
  ];
  return (
    <div className="row y-gap-30 pt-15">
      {speciContent.map((item) => (
        <div className="col-sm-4" key={item.id}>
          <div className="fw-500">{item.name}</div>
          <div className="text-15">{item.content} {item.id == 4 && "KM"} </div>
        </div>
      ))}
    </div>
  );
};
export default Specifications;
