// rafce
import React from "react";
import { Routes, Route, useNavigate, Switch } from "react-router-dom";
import { Feed, UserProfile } from "./componenets";
import Login from "./componenets/Login";
import Home from "./container/Home";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
