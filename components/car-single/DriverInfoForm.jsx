import { reserveCar } from "@/features/car/thunk";
import { useTranslations } from "next-intl";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DriverInfoForm = forwardRef((props, ref) => {
  const logedInUser = JSON.parse(localStorage.getItem("user"));
  // console.log("loged in user ", logedInUser);
  const { searchData } = useSelector((state) => state.searchData);
  const { activeCarExtras } = useSelector((state) => state.car);
  const { reservationCouponcode } = useSelector((state) => state.car);
  const [prenom, setPrenom] = useState(
    logedInUser ? logedInUser.user.first_name : ""
  );
  const [nom, setNom] = useState(logedInUser ? logedInUser.user.last_name : "");
  const [email, setEmail] = useState(logedInUser ? logedInUser.user.email : "");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState(
    logedInUser ? logedInUser.user.phone1 : ""
  );
  const [adress, setAdress] = useState(
    logedInUser ? logedInUser.user.client_info.address_line_1 : ""
  );
  const [identityPiece, setIdentityPiece] = useState(
    logedInUser ? logedInUser.user.identity_piece : ""
  );
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});

  
  const [direction, setDirection] = useState('ltr');

  const dispatch = useDispatch();

  const t = useTranslations();

  useEffect(() => {
    const dir = document.documentElement.getAttribute('dir');
    setDirection(dir);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!prenom) newErrors.prenom = t("carDetails.firstNameRequired");
    if (!nom) newErrors.nom = t("carDetails.lastNameRequired");
    if (!email) {
      newErrors.email = t("carDetails.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("carDetails.emailInvalid");
    }
    if (!telephone) {
      newErrors.telephone = t("carDetails.phoneRequired");
    } else if (
      !/^[+\d]?(?:[\d-.\s()]*)$/.test(telephone) ||
      telephone.replace(/\D/g, "").length < 10 ||
      telephone.replace(/\D/g, "").length > 15
    ) {
      newErrors.telephone = t("carDetails.phoneInvalid");
    }
    if (!identityPiece)
      newErrors.identityPiece = t("carDetails.identityRequired");
    if (!adress) {
      newErrors.adress = t("carDetails.addressRequired");
    }
    if (!acceptedTerms) {
      newErrors.acceptedTerms = t("carDetails.termsRequired");
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    // console.log("searchData.pick_up_time", searchData.pick_up_time);
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      // console.log("car i got in driver form ", props.carDetails);

      const formData = {
        "id :": props.carId,
        first_name: prenom,
        last_name: nom,
        email: email,
        phone1: telephone,
        phone2: null,
        address_line_1: adress,
        identity_piece: identityPiece,
        date_start: searchData.pick_up_time,
        date_end: searchData.drop_off_time,
        pickup_location: props.carDetails.car.agencies.location.id,
        drop_off_location: searchData.drop_off_agency.id,
        car_options: activeCarExtras,
        coupon: reservationCouponcode,
      };
      // console.log("Formulaire soumis data: ", formData);
      dispatch(reserveCar({ carId: props.carId, formData }));
    } else {
      setErrors(formErrors);
      console.error("errors ", formErrors);
      console.error("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div ref={ref} className="border-top-light mt-40 pt-40 mb-40">
      <form onSubmit={handleSubmit} style={styles.form}>
        <h5>{t("carDetails.driverInfo")}</h5>

        <div className="border-top-light mt-10 pt-10 mb-10"></div>
        {/* Boutons radio pour le genre
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input 
              type="radio" 
              value="M." 
              checked={gender === 'M.'} 
              onChange={() => setGender('M.')} 
            /> M.
          </label>
          <label style={styles.radioLabel}>
            <input 
              type="radio" 
              value="Mme." 
              checked={gender === 'Mme.'} 
              onChange={() => setGender('Mme.')} 
            /> Mme.
          </label>
        </div> */}

        {/* Champ identity */}
        <div style={styles.formGroup}>
          <label> {t("carDetails.identityCard")}*:</label>
          <input
            type="text"
            value={identityPiece}
            onChange={(e) => setIdentityPiece(e.target.value)}
            placeholder={t("carDetails.identityCard")}
            style={{
              ...styles.input,
              borderColor: errors.identityPiece ? "red" : "#ccc",
            }}
          />
          {errors.identityPiece && (
            <span style={styles.errorText}>{errors.identityPiece}</span>
          )}
        </div>
        {/* Champ prénom */}
        <div style={styles.formGroup}>
          <label>{t("carDetails.firstName")}*:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder={t("carDetails.firstName")}
            style={{
              ...styles.input,
              borderColor: errors.prenom ? "red" : "#ccc",
            }}
          />
          {errors.prenom && (
            <span style={styles.errorText}>{errors.prenom}</span>
          )}
        </div>

        {/* Champ nom */}
        <div style={styles.formGroup}>
          <label>{t("carDetails.lastName")}*:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder={t("carDetails.lastName")}
            style={{
              ...styles.input,
              borderColor: errors.nom ? "red" : "#ccc",
            }}
          />
          {errors.nom && <span style={styles.errorText}>{errors.nom}</span>}
        </div>
        {/* Champ numéro de téléphone */}
        <div style={styles.formGroup}  >
          <label>{t("carDetails.phoneNumber")}*:</label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            // placeholder={t("carDetails.phoneNumber")}
            style={{
              ...styles.input,
              borderColor: errors.telephone ? "red" : "#ccc",
            }}
          />

          {errors.telephone && (
            <span style={styles.errorText}>{errors.telephone}</span>
          )}
        </div>
        {/* Champ e-mail */}
        <div style={styles.formGroup}>
          <label>{t("carDetails.email")}*:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("carDetails.email")}
            style={{
              ...styles.input,
              borderColor: errors.email ? "red" : "#ccc",
            }}
          />
          {errors.email && <span style={styles.errorText}>{errors.email}</span>}
        </div>
        <div style={styles.formGroup}>
          <label>{t("carDetails.address")}*:</label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            placeholder={t("carDetails.address")}
            style={{
              ...styles.input,
              borderColor: errors.adress ? "red" : "#ccc",
            }}
          />
          {errors.adress && (
            <span style={styles.errorText}>{errors.adress}</span>
          )}
        </div>

        {/* Checkbox pour accepter les termes */}
        <div className="form-check mb-3 d-flex align-items-center">
          <input
            className={`form-check-input  ${direction === "ltr" ? "me-2" : "ms-2"} `}
            type="checkbox"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
            style={{ width: "20px", height: "20px", border: "1px solid #ccc" }}
          />
          <label className="form-check-label">
            {t("carDetails.termsAndConditions")}
          </label>
          {errors.acceptedTerms && (
            <div className="text-danger ms-3">{errors.acceptedTerms}</div>
          )}
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className="driver_submit_form">
          {t("carDetails.submit")}
        </button>
      </form>
    </div>
  );
});

// Styles inline pour simplifier le code

const styles = {
  form: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
   
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  radioGroup: {
    marginBottom: "10px",
    display: "flex",
    gap: "10px",
  },
  radioLabel: {
    fontSize: "16px",
  },
  infoText: {
    color: "green",
    fontSize: "14px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px 50px ",
    backgroundColor: "#B22222",
    justifyContent: "center",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default DriverInfoForm;
