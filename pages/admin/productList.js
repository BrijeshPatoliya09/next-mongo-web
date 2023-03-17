import moment from "moment";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import baseUrl from "../../helpers/baseUrl";

const ProductList = ({ prodData }) => {
  const [data, setData] = useState(prodData);
  const router = useRouter()

  const deleteUser = async (prodId) => {
    const res = await fetch(`${baseUrl}/api/products`, {
      method: "DELETE",
      body: JSON.stringify(prodId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      const res2 = await fetch(`${baseUrl}/api/products`);
      const data2 = await res2.json();
      setData(data2);
    }
  };

  return (
    <>
      <section className="intro">
        <div
          className="bg-image"
          style={{ backgroundColor: "#f5f7fa", height: "700px" }}
        >
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <h3 className="text-center mb-2">Products List</h3>
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div
                        className="table-responsive table-scroll"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative" }}
                      >
                        <table className="table table-striped mb-0 text-center">
                          <thead style={{ backgroundColor: "#002d72" }}>
                            <tr className="text-white align-middle">
                              <th scope="col">Product Name</th>
                              <th scope="col">Product Brand</th>
                              <th scope="col">Product Discounted Price</th>
                              <th scope="col">Product Price</th>
                              <th scope="col">Product Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((v) => (
                              <tr className="align-middle">
                                <td style={{width: "400px"}}>{v.name}</td>
                                <td>{v.brand}</td>
                                <td>
                                  $
                                  {(
                                    v.price -
                                    (v.price * v.discount) / 100
                                  ).toFixed(2)}
                                </td>
                                <td>${v.price}</td>
                                <td className={`${v.status == "Active" ? "text-success" : "text-danger"}`}>{v.status}</td>
                                <td>
                                  <button
                                    className=" btn fs-4 text-success"
                                    onClick={() => router.push(`/admin/editProduct/${v._id}`)}
                                  >
                                    <i class="bi bi-pencil-square"></i>
                                  </button>
                                  <button
                                    className=" btn fs-4 text-danger"
                                    onClick={() => deleteUser(v._id)}
                                  >
                                    <i className="bi bi-trash3"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const tokenData = token ? JSON.parse(token) : "";
  const res = await fetch(`${baseUrl}/api/products`, {
    method: "GET",
    headers: {
      Authorization: tokenData.token,
    },
  });
  const data = await res.json();

  return {
    props: {
      prodData: data,
    },
  };
}

export default ProductList;
