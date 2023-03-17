import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import baseUrl from "../helpers/baseUrl";

const signup = () => {
  const [signData, setSignData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      body: JSON.stringify(signData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();

    if(data.error) {
      console.log(data.error);
    }

    if(data.message) {
      console.log(data.message);
      router.push('/login');
    }
   
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={submitHandler}
        className="col-5 p-5 border rounded border-3 border-primary border-opacity-50 "
      >
        <h2 className="text-center text-primary">Sign Up</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            aria-describedby="usernameHelp"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {" "}
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            onChange={changeHandler}
          />
          <div name="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <Link href="/login">
            <p>already have a account ?</p>
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default signup;
