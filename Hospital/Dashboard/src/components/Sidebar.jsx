import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(false);
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(false);
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(false);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };

  return (
    <>
      {isAuthenticated && (
        <nav className={show ? "sidebar show" : "sidebar"}>
          <div className="links">
            <TiHome onClick={gotoHomePage} />
            <FaUserDoctor onClick={gotoDoctorsPage} />
            <MdAddModerator onClick={gotoAddNewAdmin} />
            <IoPersonAddSharp onClick={gotoAddNewDoctor} />
            <AiFillMessage onClick={gotoMessagesPage} />
            <RiLogoutBoxFill onClick={handleLogout} />
          </div>
        </nav>
      )}
      {isAuthenticated && (
        <div className="wrapper">
          <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
