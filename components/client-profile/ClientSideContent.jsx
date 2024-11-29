// components/client/ClientSideContent.jsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosConfig"; // Custom axios instance for API calls
import { redirect } from "next/navigation";
import ProfileForm from "@/components/client-profile/ProfileForm"; // Ensure this is the correct import path
import ReservationTable from "@/components/client-profile/ReservationTable"; // Ensure this is the correct import path

const ClientSideContent = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [reservations, setReservations] = useState([]);
  const { user } = useSelector((state) => state.user);

  // Redirect to home if the user is not logged in
  useEffect(() => {
    if (!Object.keys(user).length) {
      redirect("/");
    }
  }, [user]);

  // Fetch reservations when "showProfile" is false
  useEffect(() => {
    if (!showProfile) {
      axiosInstance
        .get(`/api/client/get-all-client-reservations`)
        .then((response) => {
          setReservations(response.data.all_client_reservations);
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
    }
  }, [showProfile]);

  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setShowProfile(true)}
        >
          Profile
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => setShowProfile(false)}
        >
          Reservations
        </button>
      </div>

      <Suspense fallback={<h2>...Is Loading</h2>}>
        {showProfile ? (
          <ProfileForm user={user} />
        ) : (
          <ReservationTable reservations={reservations} />
        )}
      </Suspense>
    </>
  );
};

export default ClientSideContent;
