import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet } from "react-router-dom";

function SellerLayout() {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller",  },
    { name: "Product List", path: "/seller/product-list",  },
    { name: "Orders", path: "/seller/orders",  },
  ];

  const logout = () => {
    setIsSeller(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="cursor-pointer w-28 md:w-36" />
        </Link>
        <div className="flex items-center gap-5 text-gray-600">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-gray-400 rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-screen text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-colors duration-200
                 ${
                   isActive
                     ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                     : "hover:bg-gray-100 text-gray-700"
                 }`
              }
            >
              {item.icon}
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SellerLayout;
