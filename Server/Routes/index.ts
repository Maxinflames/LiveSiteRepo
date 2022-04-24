/**
 * File: index.ts
 * Author: Maximus Vanhaarlem
 * Author Id: 100758975
 * Date: 4/24/2022
 */
 import express from "express";
const router = express.Router();

import { UserDisplayName } from "../Util/index";

// import instance of controller
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayProductsPage, DisplayServicesPage } from '../Controllers/index';

/********************* TOP LEVEL Routes **********************/
/* GET home page. */
router.get("/", DisplayHomePage);

/* GET home page. */
router.get("/home", DisplayHomePage);

/* GET about page. */
router.get("/about", DisplayAboutPage);

/* GET services page. */
router.get("/services", DisplayServicesPage);

/* GET products page. */
router.get("/products", DisplayProductsPage);

/* GET contact page. */
router.get("/contact", DisplayContactPage);


/******************************************************/
export default router;
