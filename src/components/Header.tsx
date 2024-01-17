import React, { useEffect, useRef, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import * as apiClient from "./../api/apiClient";
import { useMutation, useQueryClient } from "react-query";

const Header = () => {
  const { isLogin, showToast, isLoading } = useAppContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out successfully", type: "success" });
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      showToast({ message: "Logout failed, check your input", type: "error" });
    },
  });

  const toggleSidebar = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeSidebar = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", closeSidebar);
    } else {
      document.removeEventListener("mousedown", closeSidebar);
    }
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, [isMobileMenuOpen]);

  const logOutHandler = () => {
    mutation.mutate();
  };

  return (
    <div className="bg-pink-800 py-6">
      <div className="container px-10 mx-auto flex justify-between items-center relative">
        <span className="text-md md:text-3xl font-bold text-white tracking-tight cursor-pointer">
          <Link to={"/"}>NgeBuchin.com</Link>
        </span>
        <div className="hidden md:flex space-x-2">
          {isLogin ? (
            <>
              <Link
                to={"/my-bookings"}
                className="text-white font-bold hover:bg-white hover:text-pink-800 rounded-md"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="text-white font-bold hover:bg-white hover:text-pink-800 rounded-md"
              >
                My Hotels
              </Link>
              <button
                onClick={logOutHandler}
                disabled={isLoading}
                className="text-white font-bold hover:bg-white hover:text-pink-800 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="text-white font-bold hover:bg-white hover:text-pink-800 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 overflow-hidden z-50 bg-black bg-opacity-50 flex items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-52 h-full overflow-y-auto"
              ref={modalRef}
              initial={{ x: "100" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-end p-4">
                <button
                  className="text-pink-800 text-lg focus:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col space-y-2 p-4">
                {isLogin ? (
                  <>
                    <Link
                      to={"/my-bookings"}
                      className="text-pink-800 font-bold hover:bg-pink-800 hover:text-white rounded-md"
                    >
                      My Bookings
                    </Link>
                    <Link
                      to={"/my-hotels"}
                      className="text-pink-800 font-bold hover:bg-pink-800 hover:text-white rounded-md"
                    >
                      My Hotels
                    </Link>
                    <button
                      onClick={logOutHandler}
                      className="text-pink-800 font-bold hover:bg-pink-800 hover:text-white rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to={"/login"} className="text-pink-800 font-bold">
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
