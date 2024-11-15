
'use client'

import axiosInstance from "@/lib/axiosConfig";
import { Alert } from "bootstrap";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const ContactForm = () => {
  const [APImessage,setAPImessage] = useState("");
  const [apiError,setError] = useState(false);
  const t=useTranslations("contactUsPage.Form");

   const  handleSubmit =async (event)  => {
    event.preventDefault();
 
    const formData = new FormData(event.target);
 
    const data = Object.fromEntries(formData.entries());

    console.log('ContactForm data:', data);
    // handle form submission logic here
    try {
      const response = await axiosInstance.post("/api/contact-us", data);
      const responseData = response.data;
      console.log('response ', responseData);
      
      setAPImessage( t("ApiResponse.success")); // Assuming the server response has a message field
      setError(false); // No error occurred
    } catch (error) {
      console.error("error dans le contact Form:", error);
      setAPImessage(t("ApiResponse.error"));
      setError(true); // Error occurred
    }
  };

  return (
    <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <div className="form-input">
          <input type="text" id="name" name="full_name" required />
          <label htmlFor="name" className="lh-1 text-16 text-light-1">
           {t("fullName")}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input type="email" id="email" name="email" required />
          <label htmlFor="email" className="lh-1 text-16 text-light-1">
          {t("email")}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input type="text" id="subject" name="subject" required />
          <label htmlFor="subject" className="lh-1 text-16 text-light-1">
          {t("object")}
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <textarea id="message"  name="message"  required rows="4"></textarea>
          <label htmlFor="message"   className="lh-1 text-16 text-light-1">
          {t("message")}
          </label>
        </div>
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="button px-24 h-50 -dark-1 bg-blue-1 text-white"
        >
           {t("btn")} <div className="icon-arrow-top-right ml-15"></div>
        </button>
      </div>
        {/* Conditionally render the alert message */}
        {APImessage && (
        <div
          className={`alert mt-3 ${apiError ? 'alert-danger' : 'alert-success'}`}
          role="alert"
        >
          {APImessage}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
