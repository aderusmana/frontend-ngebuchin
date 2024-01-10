import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-pink-800 py-5">
      <div className="container px-5 mx-auto flex justify-between items-center">
        <span className="text-md md:text-3xl px-4 text-left font-bold text-white tracking-tight cursor-pointer">
          <Link to={"/"}>NgeBuchin.com</Link>
        </span>
        <span className="text-white font-bold tracking-tight md:flex gap-4 md:text-md text-xs">
         <p className="cursor-pointer"> Privacy Policy </p>
         <p className="cursor-pointer"> Terms of Services </p>
        </span>
      </div>
      <div className="flex pt-2 items-center justify-center text-white md:text-sm text-xs">
        <p>© 2023 NgeBuchin.com. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
