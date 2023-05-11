import { Route, Routes } from "react-router";
import Login from "./ components/Login";
import Home from "./ components/Home";
import FormRegister from "./ components/Register";
import Favorites from "./ components/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user";
import Profile from "./ components/Profile";
import NavbarAdmin from "./ components/admin/adminNavbar";
import TableAdmin from "./ components/admin/adminTablas";
import { setFavorite } from "./state/favorites";
import { setAppointment } from "./state/appointment";
import CardIndividual from "./ components/Card";
import Appointments from "./ components/Appointments";
import AdminCitas from "./ components/admin/AdminCitas";
import cookie from "./ components/function/cookie";
import { setMessages } from "./state/message";
import { setFavorite } from "./state/favorites";
import { setAppointment } from "./state/appointment";

function App() {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLogged.id) {
      const cookie = JSON.parse(localStorage.getItem("cookie"));
      cookie ? dispatch(setUser(cookie.payload)) : null;
    }
    if (userLogged.id) {
      axios
        .post(
          `https://houseofdev-mga1.onrender.com/api/favorite/all/${userLogged.id}`,
          { token: cookie() },
          {
            withCredentials: true,
          }
        )
        .then((favorito) => {
          console.log(favorito);
          dispatch(setFavorite(favorito.data));
        });
      axios
        .post(
          `https://houseofdev-mga1.onrender.com/api/appointment/all/${userLogged.id}`,
          { token: cookie() },
          {
            withCredentials: true,
          }
        )
        .then((appointments) => {
          dispatch(setAppointment(appointments.data));
        });
      if (!userLogged.admin) {
        axios
          .post(
            `https://houseofdev-mga1.onrender.com/api/messages/chat/${userLogged.id}`,
            { token: cookie() },
            { withCredentials: true }
          )
          .then((messages) => {
            dispatch(setMessages(messages.data));
          });
      }
    }
  }, [userLogged]);
  return (
    <div>
      {userLogged.admin == true ? (
        <>
          <NavbarAdmin />
          <Routes>
            <Route path="/" element={<TableAdmin />} />
            <Route path="/adminCitas" element={<AdminCitas />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/card/:id" element={<CardIndividual />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
