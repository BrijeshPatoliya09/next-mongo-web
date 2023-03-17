import React from "react";
import Link from "next/link";
import classes from "./NavBar.module.css";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

const NavBar = () => {
  const router = useRouter();
  const {token} = parseCookies();
  const userData = token ? JSON.parse(token) : '';

  return (
    <section className="bg-dark text-white">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between">
          <Link className="navbar-brand fs-4" href="/">
            <span className="text-danger fw-bold fs-3">E</span>{" "}
            <span className="text-white">- Commerce</span>
          </Link>
          <div className="d-flex" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
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
                <Link
                  className={`nav-link text-white ${
                    router.pathname === "/product"
                      ? classes.active
                      : classes.rainbow
                  }`}
                  aria-current="page"
                  href="/product"
                >
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="#">
                  Contect Us
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Link href="/cart">
              <button className="text-white btn shadow-none">
                <i className="bi bi-cart"></i>
              </button>
            </Link>
            <button className="text-white btn shadow-none">
              <i className="bi bi-search"></i>
            </button>
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
