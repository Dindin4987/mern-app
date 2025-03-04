import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((result) => setClients(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8080/deleteClient/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
          alert("Successfully Logged out!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "red",
          position: "absolute",
          top: 0,
          right: 0,
          margin: "10px",
          padding: "2px",
        }}
      >
        <button onClick={handleLogout}>Log-Out</button>
      </div>
      <br></br>
      <div>
        Clients
        <div>
          <Link to="/create">Add a Client</Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                return (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.contact}</td>
                    <td>{client.age}</td>
                    <td>
                      <Link to={`/update/${client._id}`}>Update</Link>
                      <button onClick={(e) => handleDelete(client._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;
