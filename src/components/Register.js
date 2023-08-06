import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { resetData } from '../redux/action'; 
import { useSelector } from 'react-redux';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);
    const navigate = useNavigate();
    let data1 = useSelector((state) => state.reducera.questionResponses);
    const dispatch = useDispatch();
    // const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();
        navigate('/chat');
        const { name, email, work, add, mobile, desc, age } = inpval;

        const res = await fetch("https://gt-7tqn.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, work, add, mobile, desc, age
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            //history.push("/")
            localStorage.setItem("mobile", mobile);
            //setUdata(data)
            console.log("data added");

        }
          await apiCallToStoreDataInServer();
          console.log("done")
        dispatch(resetData());
    }
    const dataArray = data1.map((qr) => qr.response);

    const apiCallToStoreDataInServer = async e => {
        // Get the complete store data using useSelector
        const mobileNumber = localStorage.getItem('mobile');
        // Construct the data object
        try {
          console.log(mobileNumber)
          console.log(dataArray)
          const response = await fetch('https://gt-7tqn.onrender.com/api/auth/abc', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber, dataArray }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to store data in the server');
          }
        }
        catch (error) {
          throw new Error('Error storing data in the server: ' + error.message);
        }
      };

    return (
        <div className="container">
            <NavLink to="/">home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;



