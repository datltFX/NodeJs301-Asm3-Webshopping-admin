import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import DevicesIcon from "@mui/icons-material/Devices";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import axiosClient from "../axios/axios";

function Sidebar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = JSON.parse(localStorage.getItem("userActive"));
    if (!loadUser) {
      return <Navigate to="/" />;
    }
    setUser(loadUser);
  }, []);

  const handleLogout = () => {
    axiosClient
      .post(`/logout`, { content: "bye" })
      .then((res) => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  };
  //render
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div
        className="scroll-sidebar  ps-container ps-theme-default ps-active-y"
        data-sidebarbg="skin6"
      >
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            {user.role === "counselors" && (
              <>
                <li className="sidebar-item">
                  <NavLink to="/chat" className="sidebar-link">
                    <MessageIcon sx={{ color: red[500] }} />
                    <span className="hide-menu ml-2">Chat</span>
                  </NavLink>
                </li>
              </>
            )}{" "}
            {user.role === "admin" && (
              <>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" to="/dashboard">
                    <DashboardIcon sx={{ color: red[500] }} />
                    <span className="hide-menu ml-2"> Dashboard</span>
                  </NavLink>
                </li>
                <li className="list-divider"></li>

                <li className="nav-small-cap">
                  <span className="hide-menu">List</span>
                </li>

                <li className="sidebar-item">
                  <NavLink to="/chat" className="sidebar-link">
                    <MessageIcon sx={{ color: red[500] }} />
                    <span className="hide-menu ml-2">Chat</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/products" className="sidebar-link">
                    <DevicesIcon sx={{ color: red[500] }} />
                    <span className="hide-menu ml-2">Products</span>
                  </NavLink>
                </li>
                <li className="sidebar-item" onClick={handleLogout}>
                  <NavLink to="/" className="sidebar-link">
                    <LogoutIcon sx={{ color: red[500] }} />
                    <span className="hide-menu ml-2">Logout</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
