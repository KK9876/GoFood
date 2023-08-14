import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'

const Login = () => {
  const [credentials , setcredentials] = useState({email:"" , password:""})
  let naviagte = useNavigate();
    const handlesubmit = async(e) =>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email , password:credentials.password}))
        
        const response = await fetch("http://localhost:5000/api/loginuser/" , {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email , password:credentials.password})
        });
        
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        }
        if(json.success){

          //on every login changing the authtoken for more security ,(but its an encryption after decoding it , it comes same for respective user)
          localStorage.setItem("authToken",json.authToken);

          localStorage.setItem("userEmail",credentials.email);
          
          console.log(localStorage.getItem("authToken"));
          naviagte("/")
        }
    }

    const onChange = (event) =>{
        setcredentials({...credentials , [event.target.name]:event.target.value});
    }
  return (
    <>
    <div className='container'>
      <form onSubmit={handlesubmit}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to ="/signup" className="m-3 btn btn-primary">I am a new User</Link>
      </form>
    </div>
    </>
  )
}

export default Login
