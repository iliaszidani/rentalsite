"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/user/thunk";
import { useRouter } from 'next/navigation';
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch(); 
  const [credentials, setCredentials] = useState({ phone1_or_email: '', password: '' });
  const { isLoading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.token) {
      router.push("/"); // Navigate to home page after successful login
    }
  }, [user, router]);


  const handleChange = (event) => { 
    setCredentials((prev)=>({...prev, [event.target.name]:event.target.value }))
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("credentials:", credentials);
    dispatch(loginUser(credentials))
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don't have an account yet?{" "}
          <Link href="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input">
          <input
            type="text"
            name="phone1_or_email"
            required
            
            onChange={(e) => handleChange(e)}
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
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
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          disabled={isLoading}
        >
           {isLoading ? 'Logging in...' : 'Login'} <div className="icon-arrow-top-right ml-15" />
        </button>
   
       
      {error &&  <div className="alert alert-danger mt-3" role="alert">
          {error.message || 'Login failed. Please try again.'}
        </div>}
      </div>
      {/* End .col */}
    </form>
  );
};

export default LoginForm;
