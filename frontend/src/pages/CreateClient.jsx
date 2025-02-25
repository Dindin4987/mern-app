import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateClient() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/createClient", { name, email, contact, age })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={Submit}>
        <h2>Add Client</h2>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Contact Number</label>
          <input
            type="number"
            placeholder="Contact Number"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateClient;
