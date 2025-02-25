import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateClient() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/getClient/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setContact(result.data.contact);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/updateClient/" + id, {
        name,
        email,
        contact,
        age,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={Update}>
        <h2>Update Client</h2>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Contact Number</label>
          <input
            type="number"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateClient;
