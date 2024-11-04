"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMailPassword } from "@/features/user/thunk";
import { useRouter, useSearchParams } from 'next/navigation';
const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // To rea
  const dispatch = useDispatch(); 
  const [credentials, setCredentials] = useState({ email: '' });
  const { isLoading, error, user } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const {errorList} = useSelector(state => state.user)
  useEffect(() => {
    if  (user?.token && searchParams.get('close') === 'true'){
      console.log("a1 close");
      window.close();
    }else if(user?.token && searchParams.get('close') != 'true'){
      console.log("a1 push");
      router.push("/"); // Navigate to home page after successful login
    }
  }, [user, router]);

useEffect(()=>{
  console.log("Object.entries:", Object.entries(errorList));
},[errorList])
  const handleChange = (event) => { 
    setCredentials((prev)=>({...prev, [event.target.name]:event.target.value }))
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("credentials:", credentials);
   
  
    try {
      // Wait for the login to complete
      const result = await dispatch(sendMailPassword(credentials));
  
      // Check if login was successful (you might need to adjust this based on your response structure)
      if (result.payload?.status === "Success") {
        console.log("Mail is sent successful");
  
        setMessage("Un mail a été envoyer pour changer le mot de passe");
        
      } else {
        console.log("Mail is not sent ", );
        setMessage(response.data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error("Error during send mail for password:", error);
      setMessage('Échec de la réinitialisation. Veuillez vérifier les informations et réessayer.');
    }
  };
  

  return (
    <div>

       {/* {message && <p>{message}</p>} */}
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Réinitialisation du mot de passe</h1>
        <p className="mt-10">
          Entrez votre adresse mail
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input">
          <input
            type="text"
            name="email"
            required
            
            onChange={(e) => handleChange(e)}
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}


      <div className="col-12">
      <Link href="login" className="text-14 fw-500 text-blue-1 underline">
          Back to login page
        </Link> 
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          disabled={isLoading}
        >
           {isLoading ? 'Loading...' : 'Réinitialiser le mot de passe'} <div className="icon-arrow-top-right ml-15" />
        </button>
   
       
      {error && Object.keys(errorList).length >0 && <div className="alert alert-danger mt-3" role="alert">
          {error || 'failed. Please try again.'}
          <ul>
      {Object.entries(errorList).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {value}
        </li>
      ))}
    </ul>
        </div>}
      {message &&   <div className="success success-danger mt-3" role="success">
          {message}
         
        </div>}
      </div>
      {/* End .col */}
    </form>
    </div>

  );
};

export default ForgotPasswordForm;
