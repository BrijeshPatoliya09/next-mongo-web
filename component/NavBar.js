import React from "react";
import Link from "next/link";
import classes from "./NavBar.module.css";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

const NavBar = () => {
  const router = useRouter();
  const { token } = parseCookies();
  const userData = token ? JSON.parse(token) : "";

  return (
    <section className="bg-dark text-white">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between">
          <Link className="navbar-brand fs-4" href="/">
            <span className="text-danger fw-bold fs-3">E</span>{" "}
            <span className="text-white">- Commerce</span>
          </Link>
          <div className="d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link text-white ${
                    router.pathname === "/" ? classes.active : classes.rainbow
                  }`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn text-white"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Electronics Product
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/product/catagory/TV & Appliances"
                        className="dropdown-item"
                      >
                        Tv & Appliances
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/product/catagory/Mobile & Laptops"
                        className="dropdown-item"
                      >
                        Mobile & Laptops
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/product/catagory/Electronic Ascessories"
                        className="dropdown-item"
                      >
                        Electronic Acessaries
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn text-white"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Garments & Fashion
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/product/catagory/Man"
                        className="dropdown-item"
                      >
                        Man
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/product/catagory/Women"
                        className="dropdown-item"
                      >
                        Women
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/product/catagory/Kids & Baby"
                        className="dropdown-item"
                      >
                        Kids & Baby
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <Link
                    href="/product/catagory/Sports, Books & more"
                    className="btn text-white"
                  >
                    Sports, Books & More
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Link href="/cart">
              <button className="text-white btn shadow-none">
                <i className="bi bi-cart"></i>
              </button>
            </Link>
            <div className="dropdown">
              <button
                className="text-white btn shadow-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userData && userData.user.role === "admin" && "Seller"}
                {userData && userData.user.role === "root" && "Owner"}
              </button>
              {userData && userData.user.role === "admin" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/admin/productList" className="dropdown-item">
                      Products Listed
                    </Link>
                  </li>
                </ul>
              )}
              {userData && userData.user.role === "root" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/root/orderhistory" className="dropdown-item">
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link href="/root/prodlist" className="dropdown-item">
                      Product List
                    </Link>
                  </li>
                  <li>
                    <Link href="/root/userlist" className="dropdown-item">
                      User List
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {token ? (
              <>
                <button
                  onClick={() => {
                    cookie.remove("token");
                    router.push("/login");
                  }}
                  className={`btn text-white ${
                    router.pathname === "/login"
                      ? classes.active
                      : classes.rainbow
                  }`}
                >
                  Logout
                </button>{" "}
                /
                <Link href="/account">
                  <button
                    className={`btn text-white ${
                      router.pathname === "/signup"
                        ? classes.active
                        : classes.rainbow
                    }`}
                  >
                    Account
                  </button>
                </Link>
                {userData.user.role != "user" && (
                  <>
                    {" "}
                    /
                    <Link href="/create">
                      <button
                        className={`btn text-white ${
                          router.pathname === "/create"
                            ? classes.active
                            : classes.rainbow
                        }`}
                      >
                        Create
                      </button>
                    </Link>{" "}
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/login">
                  <button
                    className={`btn text-white ${
                      router.pathname === "/login"
                        ? classes.active
                        : classes.rainbow
                    }`}
                  >
                    Login
                  </button>
                </Link>{" "}
                /
                <Link href="/signup">
                  <button
                    className={`btn text-white ${
                      router.pathname === "/signup"
                        ? classes.active
                        : classes.rainbow
                    }`}
                  >
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
