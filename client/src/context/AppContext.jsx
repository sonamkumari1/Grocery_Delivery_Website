import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Item quantity updated");
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  //Get cart items count

  const getCartCount=()=>{
    let totalCount=0;
    for (const key in cartItems) {
      totalCount += cartItems[key];
    }
    return totalCount;
  }

  //Get cart items total price
  const getCartAmount=()=>{
    let totalAmount=0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
      }
   return Math.floor(totalAmount * 100) / 100;
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    setProducts,
    setCartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
