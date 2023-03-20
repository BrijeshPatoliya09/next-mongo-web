import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import baseUrl from "../../helpers/baseUrl";

const EditUser = ({ userData }) => {
  const [signData, setSignData] = useState({
    username: userData.username,
    email: userData.email,
  });
  const [pswChange, setPswChange] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    oldPassword: ""
  })
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };

  const pswChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswords({...passwords,  [name]: value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const editData = {...signData, userId: userData._id} 
    if(passwords.newPassword !== "" && passwords.oldPassword !== ""){
      editData.newPassword = passwords.newPassword;
      editData.oldPassword = passwords.oldPassword;
    }

    const res = await fetch(`${baseUrl}/api/user`, {
      method: "PUT",
      body: JSON.stringify(editData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
    }

    if (data.message) {
      console.log(data.message);
      router.push("/account");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        onSubmit={submitHandler}
        className="col-5 p-5 border rounded border-3 border-primary border-opacity-50 "
      >
        <h2 className="text-center text-primary">Edit</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={signData.username}
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
            value={signData.email}
            aria-describedby="emailHelp"
            onChange={changeHandler}
          />
          <div name="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <hr />
        {pswChange && (
          <>
            {" "}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                onChange={pswChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                onChange={pswChangeHandler}
              />
            </div>
            <hr />
          </>
        )}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" onClick={() => setPswChange((psw) => !psw)} className="btn text-primary">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const tokenData = token ? JSON.parse(token) : "";
  const res = await fetch(`${baseUrl}/api/user`, {
    headers: {
      Authorization: tokenData.token,
    },
  });
  const userData = await res.json();

  return {
    props: {
      userData,
    },
  };
}

export default EditUser;
