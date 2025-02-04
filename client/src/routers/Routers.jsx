import React from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loaderZif from "../assets/loader.gif";
const Register = React.lazy(() => import("../components/Auth/Register"));
const DashBoard = React.lazy(() => import("../components/Dashboard"));

const Users = React.lazy(() => import("../components/Dashboard/Users"));
const NotFound = React.lazy(() => import("../components/NotFound/NotFound"));
const DashboardHomePage = React.lazy(() =>
  import("../pages/Dashboard/DashboardHomePage")
);
const Home = React.lazy(() => import("../pages/Home"));

const Room = React.lazy(() => import("../pages/Room"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Rooms = React.lazy(() => import("../pages/Rooms"));
const ManageRoom = React.lazy(() =>
  import("../components/Dashboard/ManageRoom")
);
const Account = React.lazy(() => import("../components/Dashboard/Account"));
const Settings = React.lazy(() => import("../components/Dashboard/Settings"));
const PrivateRoute = React.lazy(() =>
  import("../components/Auth/PrivateRoute")
);
const MyBooking = React.lazy(() => import("../components/Dashboard/MyBooking"));
const AllBooking = React.lazy(() =>
  import("../components/Dashboard/AllBooking")
);

const Routers = () => {
  const { isLogin, isAdmin } = useAuth();

  return (
    <Suspense
      fallback={
        <div style={{ margin: "auto", width: "400px" }}>
          <img style={{ maxWidth: "100%" }} src={loaderZif} alt="" />
        </div>
      }
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/room/:roomid/:hotelId" element={<Room />} />
   
        <Route
          path="/auth/register"
          element={isLogin ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="users" element={<Users />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="my-bookings" element={<MyBooking />} />
          {isAdmin && (
            <>
              <Route path="all-bookings" element={<AllBooking />} />
              <Route path="rooms" element={<ManageRoom />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
