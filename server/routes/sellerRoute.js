import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import express from "express"

const sellerRoute=express.Router();

sellerRoute.post('/login', sellerLogin)
sellerRoute.get('/is-auth', isSellerAuth)
sellerRoute.get('/logout', sellerLogout)

export default sellerRoute