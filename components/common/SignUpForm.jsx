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
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar"; // Adjust the import path as needed
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/user/thunk";
import { useRouter } from 'next/navigation';
import Alert from "./Alert";

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const router = useRouter();
  const { user, error, isLoading, errorList } = useSelector((slice) => slice.user);

  // console.log("is loading ", isLoading);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone1: "",
    phone2: "",
    email: "",
    identity_piece: "",
    password: "",
    // password_confirmation: "",
    address_line_1: "",
    address_line_2: "",
    date_of_birth: "",
    gender: "",
    city: "",
    county: "",
    family_status: "",
    user_type: "Client",
    user_status: "Active",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const removePhoto = () => {
    setPhoto(null);
    setFormData({ ...formData, photo: null });
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setFormData({ ...formData, photo: file });
    }
  };

  const handleNext = () => {
    const requiredFields = {
      1: [
        "first_name",
        "last_name",
        "email",
        "password",
        "password_confirmation",
      ],
      2: ["phone1", "identity_piece"],
    };
    if (formData.password !== formData.password_confirmation) return;
    const currentStepFields = requiredFields[step];
    const isValid = currentStepFields.every((field) => formData[field]);

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
    dispatch(registerUser(formData));
    // console.log(formData);
  };

  useEffect(() => {
 
    if (user &&   Object.keys(user).length !== 0) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <Alert  time={4000} errorList={errorList} />

      <div className="col-12">
        <ProgressBar step={step} />
      </div>
      {step === 1 && (
        <>
          <div className="col-12">
            <h1 className="text-22 fw-500">Welcome</h1>
            <p className="mt-10">
              Already have an account yet?{" "}
              <Link href="/login" className="text-blue-1">
                Log in
              </Link>
            </p>
          </div>
          <div className="col-12">
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
          <div className="col-12">
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
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">
                Email
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
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
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
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
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
            {formData.password !== formData.password_confirmation && (
              <div className="alert alert-danger col-12 mt-3">
                Passwords don&apos;t match
              </div>
            )}
          </div>
          <div className="col-12">
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
            <Link href="/become-expert" style={{textDecoration:"underline"}}>Joins us and create a Expert account</Link>
          </div>
        </>
      )}

      {step === 2 && (
        <><div className="col-12">
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
            <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
          </label>
        </div>
      </div>
          <div className="col-12">
            <div className="col-12 my-2">
              <label className="lh-1 text-14 text-light-1">
                Document Type:
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
              <div className="form-input ">
                <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Document Type</option>
                  <option value="passport">Passport</option>
                  <option value="identity_card">Identity Card</option>
                  <option value="driving_license">Driving License</option>
                </select>
              </div>
            </div>

            {formData.documentType && (
              <div className="form-input ">
                <input
                  type="text"
                  name="identity_piece"
                  value={formData.identity_piece}
                  onChange={handleChange}
                  required
                />
                <label className="lh-1 text-14 text-light-1">
                  document number
                  <span style={{ color: "#B7001C", fontWeight: "bold" }}>
                    *
                  </span>
                </label>
              </div>
            )}
          </div>
          {/* <div className="col-12">
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
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12">
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

          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">Address</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
              />
              <label className="lh-1 text-14 text-light-1">
                Address Street
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-input ">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">City</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-input ">
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">County</label>
            </div>
          </div> */}
          <div className="col-12 d-flex gap-3">
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
            {/* <button
              type="button"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handleNext}
            >
              Next &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
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
              <div className="  ml-15" />
            </button> */}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {!photo && (
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload Photo
              </label>
              <input
                className="form-control"
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
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

          <div className="col-12">
            <div className="form-input ">
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                max={new Date() - 18}
                required
              />
              <label className="lh-1 text-14 text-light-1">
                Date of Birth
                <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
              </label>
            </div>
          </div>
          <div className="col-12 my-2">
            <label className="lh-1 text-14 text-light-1">
              Gender
              <span style={{ color: "#B7001C", fontWeight: "bold" }}>*</span>
            </label>
            <div className="form-input ">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="col-12">
            <label className="lh-1 text-14 text-light-1">Family Status</label>

            <div className="form-input ">
              <select
                name="family_status"
                value={formData.family_status}
                onChange={handleChange}
              >
                <option value="">Select Family Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
          <div className="col-12 d-flex gap-3">
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
        </>
      )}
    </form>
  );
};

export default SignUpForm;
