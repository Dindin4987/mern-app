import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import CreateClient from "./pages/CreateClient";
import UpdateClient from "./pages/UpdateClient";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clients />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/create" element={<CreateClient />}></Route>
        <Route path="/update/:id" element={<UpdateClient />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
