"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const index_1 = require("../Util/index");
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render("index", {
            title: "Login",
            page: "login",
            messages: req.flash("loginMessage"),
            displayName: (0, index_1.UserDisplayName)(req),
        });
    }
    return res.redirect("/contact-list");
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: (0, index_1.UserDisplayName)(req) });
    }
    res.redirect('/contact-list');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            res.redirect('/login');
        }
        req.login(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            const authToken = (0, index_1.GenerateToken)(user);
            console.log(authToken);
            res.redirect('/contact-list');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    console.log(newUser);
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('Error: Inserting New User');
                req.flash('registerMessage', 'User Already Exists');
                console.error('Error: User Already Exists');
            }
            else {
                req.flash('registerMessage', ' Registration Failure');
                console.error(err.name);
            }
            res.redirect('/register');
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut();
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=auth.js.map