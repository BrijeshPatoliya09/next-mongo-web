import Link from "next/link";
import { parseCookies } from "nookies";
import React from "react";
import baseUrl from "../helpers/baseUrl";

const Account = ({ userData, cartData, OrdHistoryData }) => {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4 h-100">
              <div className="card-body text-center d-flex justify-content-center align-items-center flex-column">
                <img
                  src="https://c8.alamy.com/comp/T4DCP8/mixed-breed-dog-with-human-eyes-and-burning-cigarette-in-mouth-photomontage-T4DCP8.jpg"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{userData.username}</h5>
                <p className="text-muted mb-1">Wallet Balance:</p>
                <p className="text-muted mb-4">{}</p>
                <div className="d-flex justify-content-center mb-2">
                  <h3 className="text-primary">${userData.balance}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Role</p>
                  </div>
                  <div className="col-sm-9">
                    {userData.role !== "user" ? (
                      <p className="text-muted mb-0">user, {userData.role}</p>
                    ) : (
                      <p className="text-muted mb-0">user</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <Link href="/edituser" className="btn btn-success">Edit</Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4 text-danger">Cart</p>
                    {cartData[0].productInfo.map((v, i) => (
                      <div key={i} className="d-flex justify-content-between">
                        <p style={{ fontSize: ".77rem" }}>{v.name}</p>
                        <p>
                          $
                          {(
                            (v.price - (v.price * v.discount) / 100) *
                            cartData[0].products[i].quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4 text-success">Order History</p>
                    {OrdHistoryData.map((v, i) => (
                      <Link
                      key={i}
                        href="/cart"
                        className="btn p-0 d-flex justify-content-between"
                      >
                        <p className="mb-0" style={{ fontSize: ".77rem" }}>
                          Order No. ({v.orderNo})
                        </p>
                        <p className="mb-0">${v.totalPrice}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

  const res2 = await fetch(`${baseUrl}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: tokenData.token,
    },
  });
  const cartData = await res2.json();

  const res3 = await fetch(`${baseUrl}/api/payment`, {
    headers: {
      Authorization: tokenData.token,
    },
  });
  const OrdHistoryData = await res3.json();

  return {
    props: {
      userData,
      cartData,
      OrdHistoryData,
    },
  };
}

export default Account;
