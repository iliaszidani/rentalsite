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

'use client'
import Link from "next/link";
import { useState } from "react";
import ProgressBar from "./ProgressBar"; // Adjust the import path as needed

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone1: "",
    phone2: "",
    email: "",
    identity_piece: "",
    password: "",
    confirm_password: "",
    address_line_1: "",
    address_line_2: "",
    date_of_birth: "",
    gender: "",
    city: "",
    county: "",
    family_status: "",
    user_type:"Client",
    user_status:"Active",
    photo:null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => {
    const requiredFields = {
      1: ["first_name", "last_name", "email", "password", "confirm_password"],
      2: ["phone1", "identity_piece"],
    };

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
    console.log(formData);
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
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
              <label className="lh-1 text-14 text-light-1">First Name<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span> </label>
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
              <label className="lh-1 text-14 text-light-1">Last Name<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
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
              <label className="lh-1 text-14 text-light-1">Email<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
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
              <label className="lh-1 text-14 text-light-1">Password<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">Confirm Password<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
            </div>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handleNext}
            >
              Next 
              
              <div className="ml-15"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6" width={20}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
</div>  
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="identity_piece"
                value={formData.identity_piece}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">Identity Piece<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">Phone Number<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
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
              <label className="lh-1 text-14 text-light-1">Secondary Phone Number</label>
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
              <label className="lh-1 text-14 text-light-1">Address Street</label>
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
          </div>
          <div className="col-12 d-flex gap-3">
            <button
              type="button"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handlePrevious}
            >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6" width={20}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
 <div className=" ml-15" /> Previous
            </button>
            <button
              type="button"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
              onClick={handleNext}
            >
              Next   &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6" width={20}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
<div className="  ml-15" />
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
        <div class="mb-3">
  <label for="photo" class="form-label">Upload Photo</label>
  <input class="form-control" type="file" id="photo" name="photo" accept="image/*" onChange={handleChange} />
</div>

       
          <div className="col-12">
            <div className="form-input ">
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              <label className="lh-1 text-14 text-light-1">Date of Birth<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
            </div>
          </div>
          <div className="col-12 my-2">
              <label className="lh-1 text-14 text-light-1">Gender<span style={{color:"#B7001C", fontWeight:"bold"}}>*</span></label>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6" width={20}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
 <div className=" ml-15" /> Previous  
            </button>
            <button
              type="submit"
              className="button py-20 -dark-1 bg-blue-1 text-white w-100"
            >
              Sign Up <div className="icon-arrow-top-right ml-15" />
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
