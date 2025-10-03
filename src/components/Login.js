import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken); //usne authtoken likha tha lekin kyunke mene backend me token:authtoken kiya tha islye ayse kiya ha isy 
      navigate("/");
      props.showAlert(" Account Login Successful", "success");
    } else {
      props.showAlert(" Invalid Details", "danger");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <h1>Login to iNotebook</h1>
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
