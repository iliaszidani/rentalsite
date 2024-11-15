'use client';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import Header3 from "@/components/header/header-3";
import axiosInstance from '@/lib/axiosConfig'; // Custom axios instance for API calls
// // import { updateUserProfile } from '@/redux/slices/userSlice'; // Redux action to update user profile

// const Profile = () => {
//   const dispatch = useDispatch();

//   // Extracting necessary user data from Redux
//   const { user } = useSelector((state) => state.user);

//   // Initialize the form state with user data from Redux
//   const [profileData, setProfileData] = useState({
//     first_name: user?.user?.first_name || '',
//     last_name: user?.user?.last_name || '',
//     email: user?.user?.email || '',
//     phone1: user?.user?.phone1 || '',
//     phone2: user?.user?.phone2 || '',
//     identity_piece: user?.user?.identity_piece || '',
//     address_line_1: user?.user?.client_info?.address_line_1 || '',
//     address_line_2: user?.user?.client_info?.address_line_2 || '',
//     date_of_birth: user?.user?.client_info?.date_of_birth || '',
//     gender: user?.user?.client_info?.gender || '',
//     city: user?.user?.client_info?.city || '',
//     county: user?.user?.client_info?.county || '',
//     family_status: user?.user?.client_info?.family_status || '',
//   });
//   console.log("profileData ", user)
//   const [photo, setPhoto] = useState(null);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   // Handle photo upload
//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(profileData).forEach((key) => {
//       formData.append(key, profileData[key]);
//     });

//     if (photo) {
//       formData.append('photo', photo);
//     }

//     try {
//       const response = await axiosInstance.post('/api/user/profile/update', formData);
//       console.log('Profile updated successfully:', response.data);

//       // Update the Redux state after successful profile update
//       dispatch(updateUserProfile(response.data));

//       // Optionally, show a success message or redirect
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <>
//       <Header3 />
//       <div className="container mt-5">
//         <h2 className="mb-4">Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="first_name" className="form-label">First Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="first_name"
//                 name="first_name"
//                 value={profileData.first_name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="last_name" className="form-label">Last Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="last_name"
//                 name="last_name"
//                 value={profileData.last_name}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="phone1" className="form-label">Phone 1</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phone1"
//                 name="phone1"
//                 value={profileData.phone1}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="phone2" className="form-label">Phone 2</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="phone2"
//                 name="phone2"
//                 value={profileData.phone2}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="identity_piece" className="form-label">Identity Piece</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="identity_piece"
//                 name="identity_piece"
//                 value={profileData.identity_piece}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="address_line_1" className="form-label">Address Line 1</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="address_line_1"
//                 name="address_line_1"
//                 value={profileData.address_line_1}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="address_line_2" className="form-label">Address Line 2</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="address_line_2"
//                 name="address_line_2"
//                 value={profileData.address_line_2}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 id="date_of_birth"
//                 name="date_of_birth"
//                 value={profileData.date_of_birth}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="gender" className="form-label">Gender</label>
//               <select
//                 className="form-control"
//                 id="gender"
//                 name="gender"
//                 value={profileData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label htmlFor="city" className="form-label">City</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="city"
//                 name="city"
//                 value={profileData.city}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label htmlFor="county" className="form-label">County</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="county"
//                 name="county"
//                 value={profileData.county}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="family_status" className="form-label">Family Status</label>
//             <input
//               type="text"
//               className="form-control"
//               id="family_status"
//               name="family_status"
//               value={profileData.family_status}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="photo" className="form-label">Profile Photo</label>
//             <input
//               type="file"
//               className="form-control"
//               id="photo"
//               name="photo"
//               onChange={handlePhotoChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">Update Profile</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Profile;

import { useSelector,useDispatch } from 'react-redux';
 
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
 import Header3 from "@/components/header/header-3";
 import DefaultFooter from "@/components/footer/default";
import CallToActions from '@/components/common/CallToActions';
 

const ClientProfile = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [reservations, setReservations] = useState([]);
    const { user } = useSelector((state) => state.user);
   

   
    useEffect(() => {
        if (!showProfile) {
            axiosInstance.get(`/api/get-all-client-reservations`)
                .then(response => {
                  // console.log("res ", response)
                    setReservations(response.data.all_client_reservations);
                })
                .catch(error => {
                    console.error("Error fetching reservations:", error);
                });
        }
    }, [showProfile]);

    return (
      <>
        <Header3/>
        <div className="container   " style={{marginTop:'6rem'}}>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-primary mx-2" onClick={() => setShowProfile(true)}>Profile</button>
                <button className="btn btn-secondary mx-2" onClick={() => setShowProfile(false)}>Reservations</button>
            </div>
            <Suspense  fallback={<h2>...Is Loading</h2>}>
              
            {showProfile ? (
              <ProfileForm  user={user} />
              ) : (
                <ReservationTable reservations={reservations} />
                )}
                </Suspense>
        </div>
        <CallToActions />
        <DefaultFooter />
      </>

    );
};
export default ClientProfile;
import { updateUserProfile } from '@/features/user/userSlice';  
const ProfileForm = ({user}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user); // Access user from Redux store

  // State for profile data and image
  const [photo, setPhoto] = useState(null); // Holds the selected image file
  const [photoPreview, setPhotoPreview] = useState(user?.user?.image || "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"); // Image preview URL
  const [profileData, setProfileData] = useState({
    first_name: user?.user?.first_name || '',
    last_name: user?.user?.last_name || '',
    email: user?.user?.email || '',
    phone1: user?.user?.phone1 || '',
    phone2: user?.user?.phone2 || '',
    identity_piece: user?.user?.identity_piece || '',
    address_line_1: user?.user?.client_info?.address_line_1 || '',
    address_line_2: user?.user?.client_info?.address_line_2 || '',
    date_of_birth: user?.user?.client_info?.date_of_birth || '',
    gender: user?.user?.client_info?.gender || '',
    city: user?.user?.client_info?.city || '',
    county: user?.user?.client_info?.county || '',
    family_status: user?.user?.client_info?.family_status || '',
  });

  // Handle file change (image upload)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', profileData.first_name);
    formData.append('last_name', profileData.last_name);
    formData.append('email', profileData.email);
    formData.append('phone1', profileData.phone1);
    formData.append('phone2', profileData.phone2);
    formData.append('identity_piece', profileData.identity_piece);
    formData.append('address_line_1', profileData.address_line_1);
    formData.append('address_line_2', profileData.address_line_2);
    formData.append('date_of_birth', profileData.date_of_birth);
    formData.append('gender', profileData.gender);
    formData.append('city', profileData.city);
    formData.append('county', profileData.county);
    formData.append('family_status', profileData.family_status);

    // Add image file if selected
    

    for (let [key, value] of formData.entries()) {
      // console.log(`${key}: ${value}`);
    }

    try {
      // console.log("formData ", formData);
      // Send form data to server
      const response = await axiosInstance.post('/api/update-profile', formData);
      // console.log("response ", response)
      const updatedUser = response.data;

      // Update Redux store with new user data
      dispatch(updateUserProfile(updatedUser));

      // Sync updated user data to local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="p-4 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="text-center mb-4">
        <div className="position-relative d-inline-block">
          {/* Display selected image or default avatar */}
          <img
          width={100}
          height={100}
            src={photoPreview}
            alt="User Profile"
            className="rounded-circle avatar-xl img-thumbnail user-profile-image  "
            style={{ cursor: 'pointer' }}
            onClick={() => document.getElementById('photoInput').click()} // Open file input on image click
          />
          <div className="position-absolute bottom-0 end-0">
            <i className="bi bi-pencil-fill bg-white p-1 rounded-circle"></i>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        id="photoInput"
        name="photo"
        accept="image/*"
        className="d-none"
        onChange={handlePhotoChange}
      />

           <div className="row">
             <div className="col-md-6 mb-3">
               <label htmlFor="first_name" className="form-label">First Name</label>
               <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={profileData.first_name}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={profileData.last_name}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phone1" className="form-label">Phone 1</label>
              <input
                type="text"
                className="form-control"
                id="phone1"
                name="phone1"
                value={profileData.phone1}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="phone2" className="form-label">Phone 2</label>
              <input
                type="text"
                className="form-control"
                id="phone2"
                name="phone2"
                value={profileData.phone2}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="identity_piece" className="form-label">Identity Piece</label>
              <input
                type="text"
                className="form-control"
                id="identity_piece"
                name="identity_piece"
                value={profileData.identity_piece}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="address_line_1" className="form-label">Address Line 1</label>
              <input
                type="text"
                className="form-control"
                id="address_line_1"
                name="address_line_1"
                value={profileData.address_line_1}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="address_line_2" className="form-label">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                id="address_line_2"
                name="address_line_2"
                value={profileData.address_line_2}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="date_of_birth"
                name="date_of_birth"
                value={profileData.date_of_birth}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="county" className="form-label">County</label>
              <input
                type="text"
                className="form-control"
                id="county"
                name="county"
                value={profileData.county}
                onChange={handleChange}
                style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="family_status" className="form-label">Family Status</label>
            <input
              type="text"
              className="form-control"
              id="family_status"
              name="family_status"
              value={profileData.family_status}
              onChange={handleChange}
              style={{ border: '1px solid #ced4da', backgroundColor: '#ffffff' }}
            />
          </div>
 
          <button type="submit" className="btn btn-primary">Save</button>
      </form>
  );  
};

const ReservationTable = ({ reservations }) => {
  // console.log("ReservationTable", reservations)
  
  const formatDateForDisplay = (date) => {
    const d = new Date(date);   
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2, '0');  
    const minute = String(d.getMinutes()).padStart(2, '0');  
    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  const getStatusClasses = (status) => {
    switch (status) {
      case 'cancelled':
        return 'badge bg-danger-subtle text-danger text-uppercase';
      case 'pending':
        return 'badge bg-warning-subtle text-danger text-uppercase';
      case 'completed':
        return 'badge bg-success-subtle text-success text-uppercase';
      case 'processing':
        return'badge bg-info-subtle text-info text-uppercase';
      default:
        return '';
    }
    };
  
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th className="w-auto text-center">Reservation ID</th>
              <th className="w-auto">Car</th>
              <th className="text-nowrap text-center">Reservation Date</th>
              <th className="w-auto text-center">Car Day Price</th>
              <th className="text-nowrap text-center">Dates</th>
              <th className="w-auto text-center">Car Total Price</th>
              <th className="w-auto text-center">Extras Cost</th>
              <th className="w-auto text-center">Total Price</th>
              <th className="w-auto text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              const reservationDateTime = formatDateForDisplay(reservation.created_at);
              const pickUpDateTime = formatDateForDisplay(reservation.date_start);
              const dropOffDateTime = formatDateForDisplay(reservation.date_end);
              const statusClasses = getStatusClasses(reservation.reservation_status);
              return (
                <tr key={reservation.id}>
                  <td className="px-3 text-center">{reservation.id}</td>
                  <td className="px-3">
                    <Link href={`/car/${reservation.car.id}`} className="text-decoration-none text-primary">
                      {reservation.car.car_name}
                    </Link>
                  </td>
                  <td className="px-3 text-center">{reservationDateTime}</td>
                  <td className="px-3 text-center">{reservation.car_unit_price}</td>
                  <td className="px-3 text-center">{pickUpDateTime} - {dropOffDateTime}</td>
                  <td className="px-3 text-center">{reservation.car_total_price}</td>
                  <td className="px-3 text-center">{reservation.options_price}</td>
                  <td className="px-3 text-center">{reservation.total_price}</td>
                  <td className={`px-3 text-center`}><span   className={`${statusClasses}`}>{reservation.reservation_status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
    
};

