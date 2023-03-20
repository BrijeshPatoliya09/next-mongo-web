import moment from "moment";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import baseUrl from "../../helpers/baseUrl";

const OrderHistiory = ({ orderHistoryData }) => {
  console.log(orderHistoryData);
  const [orederData, setOrderData] = useState(orderHistoryData);
  const orderStatusChangeHandler = async (v) => {
    const res2 = await fetch(`${baseUrl}/api/payment`, {
      method: "PUT",
      body: JSON.stringify(v._id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const orderHistorystatus = await res2.json();
    if (orderHistorystatus.message) {
      const res = await fetch(`${baseUrl}/api/payment`);
      const orderData = await res.json();
      setOrderData(orderData);
    }
  };
  return (
    <>
      <h1 className="text-center my-4">Order History</h1>
      <div className="container-fluid">
        <div className="row px-5">
          <div className="px-5">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Order No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Product Bought</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Buing Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orederData.map((v, i) => (
                  <tr key={v._id}>
                    <th scope="row">{v.orderNo}</th>
                    <td>{v.userInfo[0].username}</td>
                    <td>{v.userInfo[0].email}</td>
                    <td>
                      {v.productInfo.map((val, index) => (
                        <p key={index} className="m-0">
                          {val.name} - {v.products[index].quantity}
                        </p>
                      ))}
                    </td>
                    <td>{v.totalPrice}</td>
                    <td>{moment(v.createdAt).format("lll")}</td>

                    {v.delivery === "Shipped" || v.delivery === "Pending" ? (
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => orderStatusChangeHandler(v)}
                            checked={v.delivery === "Shipped"}
                            disabled={v.delivery === "Shipped"}
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            {v.delivery}
                          </label>
                        </div>
                      </td>
                    ) : (
                      <td className="text-success"><i className="bi bi-check-circle-fill me-1"></i>{v.delivery}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  if (tokenData.user.role !== "root") {
    return {
      redirect: {
        permanent: false,
        destination: "/account",
      },
    };
  }

  const res2 = await fetch(`${baseUrl}/api/payment`);
  const orderHistoryData = await res2.json();

  return {
    props: {
      orderHistoryData,
    },
  };
}

export default OrderHistiory;
