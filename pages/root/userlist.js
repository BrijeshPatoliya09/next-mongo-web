import moment from "moment";
import React, { useState } from "react";
import baseUrl from "../../helpers/baseUrl";

const UserList = ({ userListData }) => {
  const [data, setData] = useState(userListData);

  const roleChangeHandler = async (e, userId) => {
    const res = await fetch(`${baseUrl}/api/user`, {
      method: "POST",
      body: JSON.stringify({ userId, role: e.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      const res2 = await fetch(`${baseUrl}/api/user`);
      const data2 = await res2.json();
      setData(data2);
    }
  };

  const deleteUser = async (userId) => {
    const res = await fetch(`${baseUrl}/api/user`, {
      method: "DELETE",
      body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      const res2 = await fetch(`${baseUrl}/api/user`);
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
                <h3 className="text-center mb-2">Users List</h3>
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
                            <tr className="text-white">
                              <th scope="col">UserName</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Created On</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((v) => (
                              <tr className="align-middle">
                                <td>{v.username}</td>
                                <td>{v.email}</td>
                                <td>
                                  <select
                                    className="form-select col-6"
                                    onChange={(e) =>
                                      roleChangeHandler(e, v._id)
                                    }
                                    aria-label="Default select example"
                                  >
                                    <option
                                      value="admin"
                                      selected={v.role === "admin"}
                                    >
                                      Admin
                                    </option>
                                    <option
                                      value="user"
                                      selected={v.role === "user"}
                                    >
                                      User
                                    </option>
                                    <option
                                      value="root"
                                      selected={v.role === "root"}
                                    >
                                      Root
                                    </option>
                                  </select>
                                </td>
                                <td>{moment(v.createdAt).format("L")}</td>
                                <td>
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
  const res = await fetch(`${baseUrl}/api/user`);
  const data = await res.json();

  return {
    props: {
      userListData: data,
    },
  };
}

export default UserList;
