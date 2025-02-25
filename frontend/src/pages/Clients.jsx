import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState([]);

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

  return (
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
                <tr>
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
  );
}

export default Clients;
