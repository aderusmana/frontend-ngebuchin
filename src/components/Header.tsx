import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLogin } = useAppContext();
  return (
    <div className="bg-pink-800 py-6">
      <div className="container px-10  mx-auto flex justify-between">
        <span className="text-md md:text-3xl  font-bold text-white tracking-tight cursor-pointer">
          <Link to={"/"}>NgeBuchin.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLogin ? (
            <>
              <Link to={"my-bookings"}>My Bookings</Link>
              <Link to={"my-hotels"}>My Hotels</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center text-white px-3 font-bold hover:bg-white hover:text-pink-800 rounded-md"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
