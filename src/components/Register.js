// import React, { useContext, useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import { adddata } from './context/ContextProvider';

// const Register = () => {

//     const { udata, setUdata } = useContext(adddata);

//     // const history = useHistory();

//     const [inpval, setINP] = useState({
//         name: "",
//         email: "",
//         age: "",
//         mobile: "",
//         work: "",
//         add: "",
//         desc: ""
//     })

//     const setdata = (e) => {
//         console.log(e.target.value);
//         const { name, value } = e.target;
//         setINP((preval) => {
//             return {
//                 ...preval,
//                 [name]: value
//             }
//         })
//     }


//     const addinpdata = async (e) => {
//         e.preventDefault();

//         const { name, email, work, add, mobile, desc, age } = inpval;

//         const res = await fetch("https://gt-7tqn.onrender.com/api/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name, email, work, add, mobile, desc, age
//             })
//         });

//         const data = await res.json();
//         console.log(data);

//         if (res.status === 422 || !data) {
//             console.log("error ");
//             alert("error");

//         } else {
//             //history.push("/")
//             localStorage.setItem("mobile", mobile);
//             setUdata(data)
//             console.log("data added");

//         }
//     }

//     return (
//         <div className="container">
//             <NavLink to="/">home</NavLink>
//             <form className="mt-4">
//                 <div className="row">
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputEmail1" class="form-label">Name</label>
//                         <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                     </div>
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputPassword1" class="form-label">email</label>
//                         <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputPassword1" class="form-label">age</label>
//                         <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputPassword1" class="form-label">Mobile</label>
//                         <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputPassword1" class="form-label">Work</label>
//                         <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 col-lg-6 col-md-6 col-12">
//                         <label for="exampleInputPassword1" class="form-label">Address</label>
//                         <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 col-lg-12 col-md-12 col-12">
//                         <label for="exampleInputPassword1" class="form-label">Description</label>
//                         <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
//                     </div>

//                     <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
// export default Register;



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [inpval, setINP] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
    otp: '',
  });

  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    isOtpVerified: false,
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleOtpVerification = async () => {
    const res = await fetch('http://localhost:3002/generate-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: inpval.mobile,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setOtpData({ ...otpData, otp: data.otp, isOtpSent: true });
    }
  };

  const verifyOtp = () => {
    if (otpData.otp === inpval.otp) {
      alert('OTP verified successfully');
      setINP({ ...inpval, otp: '' });
      setOtpData({ ...otpData, isOtpVerified: true });
    } else {
      alert('OTP verification failed');
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="text"
              value={inpval.age}
              onChange={setdata}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              value={inpval.work}
              onChange={setdata}
              name="work"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpval.add}
              onChange={setdata}
              name="add"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>

        <button type="submit" onClick={handleOtpVerification} className="btn btn-primary">
          Get OTP
        </button>

        {otpData.isOtpSent && (
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              type="number"
              value={inpval.otp}
              onChange={setdata}
              name="otp"
              className="form-control"
              id="otp"
            />
            {otpData.isOtpVerified ? (
              <p className="text-success">OTP verified</p>
            ) : (
              <button type="button" onClick={verifyOtp} className="btn btn-primary mt-2">
                Verify OTP
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
