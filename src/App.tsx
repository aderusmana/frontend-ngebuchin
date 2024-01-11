import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import HomePage from "./pages/HomePage";
import MyHotels from "./pages/MyHotels";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <>
                  <HomePage />
                </>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <p>Search Page</p>
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout><Register /></Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout><Login /></Layout>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Layout><MyBookings /></Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout><MyHotels /></Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
