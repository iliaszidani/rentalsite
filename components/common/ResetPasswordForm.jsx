"use client";

import Link from "next/link";
import { useEffect, useState, useNavigate } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/features/user/thunk";
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {


 
 
  const router = useRouter();
  const [message, setMessage] = useState('');
 
 
 
  const searchParams = useSearchParams(); // To rea
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const dispatch = useDispatch(); 
  
  const [notMatching, setNotMatching] = useState(false);
  const [credentials, setCredentials] = useState({password_confirmation:'', password: '',  token:token ?? null,email:email ?? null  });
  const { isLoading, error, user } = useSelector((state) => state.user);
 

  useEffect(() => {
    if  (user?.token && searchParams.get('close') === 'true'){
      // console.log("a1 close");
      window.close();
    }else if(user?.token && searchParams.get('close') != 'true'){
      // console.log("a1 push");
      router.push("/"); // Navigate to home page after successful login
    }
  }, [user, router]);


  const handleChange = (event) => { 
    setCredentials((prev)=>({...prev, [event.target.name]:event.target.value }))
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(  credentials.password  !== credentials.password_confirmation  ){ setNotMatching(true) }else  {setNotMatching(false);}

    // console.log("credentials:", credentials);

    try {
      // Wait for the login to complete
      const result = await dispatch(resetPassword(credentials));
  
      // Check if login was successful (you might need to adjust this based on your response structure)
      if (result.payload?.status === "Success") {
        // console.log("Le mot de passe est changé avec succès");
  
        setMessage("Le mot de passe est changé avec succès");
        
      } else {
        // console.log("Password does  not change ", );
        setMessage(response.data.message || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error("Error during send mail for password:", error);
      setMessage('Échec de la réinitialisation. Veuillez réessayer plus tard.');
    }
  };
  

  return (
    <div>
       {message && <p>{message}</p>}

    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don't have an account yet?{" "}
          <Link href={searchParams.get('close') === 'true' ? "/signup" : "/signup?close=true"} className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
   
      {/* End .col */}

      <div className="col-12">
        <div className="form-input">
          <input
            type="password"
            name="password"
            required
           
            onChange={(e) =>  handleChange(e)}
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}
      <div className="col-12">
        <div className="form-input">
          <input
            type="password"
            name="password_confirmation"
            required
           
            onChange={(e) =>  handleChange(e)}
          />
          <label className="lh-1 text-14 text-light-1">Password Confirmation</label>
        </div>
      </div>
      {notMatching && 
      <div className="alert alert-danger col-12 mt-3">
                Passwords don't match
              </div>
      }
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
          disabled={isLoading || notMatching}
        >
           {isLoading ? 'Loading...' : 'Submit'} <div className="icon-arrow-top-right ml-15" />
        </button>
   
       
      {error &&  <div className="alert alert-danger mt-3" role="alert">
          {error.message || 'Login failed. Please try again.'}
        </div>}
      </div>
      {/* End .col */}
    </form>
    </div>
  );
};

export default ResetPasswordForm;
