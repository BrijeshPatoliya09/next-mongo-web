import React, { useState } from "react";
import Link from "next/link";
import baseUrl from "../helpers/baseUrl";
import cookie from "js-cookie"
import { useRouter } from "next/router";

const login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const router = useRouter();

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();

    if(data.error){
      console.log(data.error);
    } else {
      cookie.set('token', JSON.stringify({token: data.token, user: data.user}));
      router.push('/account');
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={submitHandler} className="col-5 p-5 border rounded border-3 border-primary border-opacity-50 ">
        <h2 className="text-center text-primary">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {" "}
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={changeHandler}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" onChange={changeHandler} />
        </div>
        <div className="mb-3">
          <Link href="/signup">
            <p>Dont have a account ?</p>
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default login;
