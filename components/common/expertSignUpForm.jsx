// import Link from "next/link";

// const SignUpForm = () => {
//   return (
//     <form className="row y-gap-20">
//       <div className="col-12">
//         <h1 className="text-22 fw-500">Welcome</h1>
//         <p className="mt-10">
//           Already have an account yet?{" "}
//           <Link href="/login" className="text-blue-1">
//             Log in
//           </Link>
//         </p>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input type="text" required />
//           <label className="lh-1 text-14 text-light-1">First Name</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input type="text" required />
//           <label className="lh-1 text-14 text-light-1">Last Name</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input type="text" required />
//           <label className="lh-1 text-14 text-light-1">Email</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input type="password" required />
//           <label className="lh-1 text-14 text-light-1">Password</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="form-input ">
//           <input type="password" required />
//           <label className="lh-1 text-14 text-light-1">Confirm Password</label>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <div className="d-flex ">
//           <div className="form-checkbox mt-5">
//             <input type="checkbox" name="name" />
//             <div className="form-checkbox__mark">
//               <div className="form-checkbox__icon icon-check" />
//             </div>
//           </div>
//           <div className="text-15 lh-15 text-light-1 ml-10">
//             Email me exclusive Agoda promotions. I can opt out later as stated
//             in the Privacy Policy.
//           </div>
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-12">
//         <button
//           type="submit"
//           href="#"
//           className="button py-20 -dark-1 bg-blue-1 text-white w-100"
//         >
//           Sign Up <div className="icon-arrow-top-right ml-15" />
//         </button>
//       </div>
//       {/* End .col */}
//     </form>
//   );
// };

// export default SignUpForm;

"use client";
import Link from "next/link";
import { useEffect, useState, createRef, useRef } from "react";
import ProgressBar from "./ProgressBar"; // Adjust the import path as needed
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/user/thunk";
import { useRouter } from "next/navigation";
import Alert from "./Alert";

const ExpertSignUpForm = () => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const router = useRouter();
  const fileInputRef = createRef();
  const fileInputLogoRef = useRef(null);
  const fileInputCoverRef = useRef(null);




  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
 
  
 
  
  const removeLogo = () => {
    setLogo(null);
    fileInputLogoRef.current.value = '';
  };
  
  const removeCover = () => {
    setCover(null);
    fileInputCoverRef.current.value = '';
  };
  






  const { user, error, isLoading, errorList } = useSelector(
    (slice) => slice.user
  );

  // console.log("is loading ", isLoading);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Existing owner info
    photo: null,
    identity_piece: "",
    first_name: "",
    last_name: "",
    address_line_1: "",
    phone1: "",
    phone2: "",
    email: "",
    password: "",

    user_type: "Vendor",
    user_status: "Active",

    // New company info
    vendor_name: "",
    vendor_phonenumber: "",
    vendor_reseau_social: "",
    vendor_adresse: "",
    vendor_tva: "",
    vendor_cie: "",
    vendor_description: "",
    vendor_localisation: "",
    vendor_user_matricule: "",
    vendor_user_gender: "",
    vendor_user_address: "",
    vendor_user_hire_date: "",
    vendor_logo: null,
    vendor_cover: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
      vendor_user_identity:
        name === "identity_piece" ? value : formData.vendor_user_identity, // Set vendor_user_identity from identity_piece
    });
  };
  const removePhoto = () => {
    setPhoto(null);
    setFormData({ ...formData, photo: null });
  };
  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPhoto(URL.createObjectURL(file));
  //     setFormData({ ...formData, photo: file });
  //   }
  // };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader(); // Use FileReader to convert to URL
      reader.onload = (e) => {
        setPhoto(e.target.result); // Set the photo preview
        setFormData((prev) => ({ ...prev, photo: file })); // Update formData with the photo file
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  const validateImage = (
    file,
    requiredWidth,
    requiredHeight,
    isCoverImage = false
  ) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        let isValid;

        if (isCoverImage) {
          const widthValid = img.width >= 1000 && img.width <= 2200;
          const heightValid = img.height >= 220 && img.height <= 880;
          isValid = widthValid && heightValid;
        } else {
          isValid =
            img.width === requiredWidth && img.height === requiredHeight;
        }

        URL.revokeObjectURL(img.src); // Clean up memory
        resolve(isValid);
      };

      img.onerror = () => {
        console.error("Failed to load image.");
        URL.revokeObjectURL(img.src); // Clean up memory on error
        resolve(false); // Handle invalid or non-image files gracefully
      };
    });
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = await validateImage(file, 500, 150);
      if (isValid) {
        setFormData({ ...formData, vendor_logo: file });
  
        const imageUrl = URL.createObjectURL(file);
        setLogo(imageUrl);
      } else {
        alert(
          "Logo must be 500x150px. Cover image must be between 1000x220 and 2200x880."
        );
        fileInputLogoRef.current.value = ""; // Reset file input
      }
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const isValid = await validateImage(file, 1190, 260, true); // Check if it's a valid cover image

        if (isValid) {
          setFormData({ ...formData, vendor_cover: file });      const imageUrl = URL.createObjectURL(file);
        setCover(imageUrl);
        } else {
          alert(
            "Vendor cover image must have: \n- Width between 1000px and 2200px \n- Height between 220px and 880px. \n- (1190px x 260px) will be great "
          );
          e.target.value = ""; // Clear the file input on invalid image
        }
      } catch (error) {
        console.error("Image validation failed:", error);
        alert(
          "An error occurred while validating the image. Please try again."
        );
        e.target.value = ""; // Reset input if validation fails unexpectedly
      }
    }
  };

  const handleNext = () => {
    const requiredFields = {
      1: [
        "identity_piece",
        "first_name",
        "last_name",
        "address_line_1",
        "phone1",
        // "phone2", not required
        "email",
        "password",
        // "password_confirmation", noo need there is password checker
      ],
      2: [
        "vendor_name",
        "vendor_phonenumber",
        // "vendor_reseau_social",
        "vendor_adresse",
        "vendor_tva",
        "vendor_cie",
        "vendor_description",
        "vendor_localisation",
        "vendor_user_matricule",
        "vendor_user_gender",
        "vendor_user_address",
        "vendor_user_hire_date",
        "vendor_logo",
        // "vendor_cover",
      ],
    };
    if (formData.password !== formData.password_confirmation) return;
    const currentStepFields = requiredFields[step];
    const isValid = currentStepFields.every((field) => formData[field]);
    // console.log("step  :::", step);
    // console.log("formData  :::", formData);
    if (isValid) {
      setStep(step + 1);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    const newformData = new FormData(); // to include files
    if(formData.vendor_logo){
      newformData.append("vendor_logo",formData.vendor_logo)
    }
    if(formData.vendor_cover){
      newformData.append("vendor_cover",formData.vendor_cover)
    }
    if(formData.photo){
      newformData.append("photo",formData.photo)
    }

    Object.keys(formData).forEach((key)=>{
      if(key !== "vendor_logo" && key !== "vendor_cover"  && key !== "photo"){
        newformData.append(key, formData[key])
      }
      
    });
    // console.log('FormData contents:');
    // for (let [key, value] of newformData.entries()) {
    //   if (value instanceof File) {
    //     console.log(`${key}: ${value.name} (${value.size} bytes, ${value.type})`);
    //   } else {
    //     console.log(`${key}: ${value}`);
    //   }
    // }
    
    dispatch(registerUser(newformData));
    // console.log(formData);
  };

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <Alert time={4000} errorList={errorList} />
     
      <div className="col-12">
        <ProgressBar step={step} />
      </div>
      {step === 1 && (
        <div class="container">
          <div class="row">
            <div className="col-12">
              <h1 className="text-22 fw-500">Welcome</h1>
              <p className="mt-10">
                Join us and became an expert{" "}
                {/* <Link href="admin-tpanel/login" className="text-blue-1">
                Log in
              </Link> */}
              </p>
              <h2>Owner Infos</h2>
            </div>
            {!photo && (
              <div className="mb-3">
                <div
                  className="image-placeholder1"
                  onClick={() => fileInputRef.current.click()}
                >
                  {!photo && (
                    <div className="circular-placeholder1">
                      <span>+</span>
                    </div>
                  )}

                  <input
                    className="form-control"
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                </div>
              </div>
            )}

            {photo && (
              <div className="mb-3 text-center">
                <img
                  src={photo}
                  alt="Profile"
                  className="img-thumbnail"
                  style={{ width: "150px", margin: "0 10px 10px 0" }}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={removePhoto}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    width={25}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="col-12  mt-3">
              <div className="form-input ">
                <input
                  type="text"
                  name="identity_piece"
                  value={formData.identity_piece}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Identity piece number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  First Name
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>{" "}
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Last Name
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="address_line_1"
                  value={formData.address_line_1}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  User Address
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="text"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Phone Number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Secondary Phone Number
                </label>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="form-input ">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Email
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Password
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input ">
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Confirm Password
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
            {formData.password !== formData.password_confirmation && (
              <div className="alert alert-danger col-12 mt-3 ">
                Passwords don't match
              </div>
            )}
            <div className="col-12 mt-3">
              <button
                type="button"
                className="button py-20 -dark-1 bg-blue-1 text-white w-100"
                onClick={handleNext}
              >
                Next
                <div className="ml-15">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-6"
                    width={20}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Company Infos</h2>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_name"
                  value={formData.vendor_name}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Vendor Name
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_phonenumber"
                  value={formData.vendor_phonenumber}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Vendor Phone Number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_reseau_social"
                  value={formData.vendor_reseau_social}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light- 1">
                  Social Media Link
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_adresse"
                  value={formData.vendor_adresse}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Address
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_tva"
                  value={formData.vendor_tva}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  VAT Number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_cie"
                  value={formData.vendor_cie}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Company Registration Number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <textarea
                  name="vendor_description"
                  value={formData.vendor_description}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Company Description
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_localisation"
                  value={formData.vendor_localisation}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Company Location{" "}
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_user_matricule"
                  value={formData.vendor_user_matricule}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Matricule Number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
 
            <div className="col-12 col-sm-6 mt-3">
            <label className="lh-1 text-14 text-light-1">
              Gender
              <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
            </label>
            <div className="form-input ">
              <select
                name="vendor_user_gender"
                value={formData.vendor_user_gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="text"
                  name="vendor_user_address"
                  value={formData.vendor_user_address}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  User Address
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="date"
                  name="vendor_user_hire_date"
                  value={formData.vendor_user_hire_date}
                  onChange={handleChange}
                />
                <label className="lh-1 text-14 text-light-1">
                  Hire Date
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>
   {/* Old images handler start */}
            {/* <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="file"
                  name="vendor_logo"
                  onChange={handleLogoChange}
                  ref={fileInputLogoRef}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  Vendor Logo (500x150px)
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="form-input">
                <input
                  type="file"
                  name="vendor_cover"
                  onChange={handleCoverChange}
                  ref={fileInputCoverRef}
                  required
                />

                <label className="lh-1 text-14 text-light-1">
                  Vendor Cover Image (1000 &lt; width &lt; 2200 ) et ( 220 &lt;
                  height &lt; 880 )
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            </div> */}

             {/* Old images handler end */}
       {/* new one  */}



       <div className="col-12 mt-3">
         <label className="lh-1 text-14 text-light-1">
                  Vendor Logo (500x150px)
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
  <div className="form-input">
    <input
      type="file"
      name="vendor_logo"
      accept="image/*"
      onChange={handleLogoChange}
      style={{ display: 'none' }}
      ref={fileInputLogoRef}
    />
    {!logo && (
      <div
        className="image-placeholder rectangular-placeholder"
        onClick={() => fileInputLogoRef.current.click()}
      >
        <span>+</span>
      </div>
    )}

    {logo && (
      <div className="image-preview">
        <img src={logo} alt="Vendor Logo" className="img-thumbnail" />
        <button
          type="button"
          className="btn btn-danger remove-btn"
          onClick={removeLogo}
        >
          Remove
        </button>
      </div>
    )}
  </div>
</div>

<div className="col-12 mt-3">
<label className="lh-1 text-14 text-light-1">
                  Vendor Cover Image (1000 &lt; width &lt; 2200 ) et ( 220 &lt;
                  height &lt; 880 )
                  
                </label>
  <div className="form-input">
    <input
      type="file"
      name="vendor_cover"
      accept="image/*"
      onChange={handleCoverChange}
      style={{ display: 'none' }}
      ref={fileInputCoverRef}
    />
    {!cover && (
      <div
        className="image-placeholder rectangular-placeholder"
        onClick={() => fileInputCoverRef.current.click()}
      >
        <span>+</span>
      </div>
    )}

    {cover && (
      <div className="image-preview">
        <img src={cover} alt="Vendor Cover" className="img-thumbnail" />
        <button
          type="button"
          className="btn btn-danger remove-btn"
          onClick={removeCover}
        >
          Remove
        </button>
      </div>
    )}
  </div>
</div>

       {/* new one  */}
    <div className="col-12 d-flex gap-3 mt-3">
            <button
              type="button"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handlePrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
                width={20}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <div className=" ml-15" /> Previous
            </button>
            <button
              type="submit"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              disabled={isLoading}
            >
              {isLoading ? "Signin Up..." : "Sign Up"}
              <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
          </div>
        </div>
      )}

       
    </form>
  );
};

export default ExpertSignUpForm;
