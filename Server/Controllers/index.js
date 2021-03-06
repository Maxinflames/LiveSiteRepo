"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayContactPage = exports.DisplayAboutPage = exports.DisplayServicesPage = exports.DisplayProductsPage = exports.DisplayHomePage = void 0;
const index_1 = require("../Util/index");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, index_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayProductsPage(req, res, next) {
    res.render("index", {
        title: "Our Products", page: "products", displayName: (0, index_1.UserDisplayName)(req),
    });
}
exports.DisplayProductsPage = DisplayProductsPage;
function DisplayServicesPage(req, res, next) {
    res.render("index", {
        title: "Our Services", page: "services", displayName: (0, index_1.UserDisplayName)(req),
    });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayAboutPage(req, res, next) {
    res.render("index", {
        title: "About Us",
        page: "about",
        displayName: (0, index_1.UserDisplayName)(req),
    });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayContactPage(req, res, next) {
    res.render("index", {
        title: "Contact Us",
        page: "contact",
        displayName: (0, index_1.UserDisplayName)(req),
    });
}
exports.DisplayContactPage = DisplayContactPage;
//# sourceMappingURL=index.js.map