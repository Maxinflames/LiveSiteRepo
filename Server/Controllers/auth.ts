/**
 * File: auth.ts
 * Author: Maximus Vanhaarlem
 * Author Id: 100758975
 * Date: 4/24/2022
 */
 import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

import User from "../Models/user";
import { GenerateToken, UserDisplayName } from '../Util/index';

// Display Pages
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if (!req.user) {
        return res.render("index", {
          title: "Login",
          page: "login",
          messages: req.flash("loginMessage"),
          displayName: UserDisplayName(req),
        });
      }
    
      return res.redirect("/contact-list");
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
      return res.render('index', 
      { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }
  
    res.redirect('/contact-list');
}

// Process Pages
export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', function(err, user, info)
    {
      // are there server errors?
      if(err)
      {
        console.error(err);
        return next(err);
      }
  
      // are there login errors?
      if(!user)
      {
        req.flash('loginMessage', 'Authentication Error');
        res.redirect('/login');
      }
  
      req.login(user, function(err)
      {
        // are there db errors?
        if(err)
        {
          console.error(err);
          return next(err);
        }

        const authToken = GenerateToken(user);

        console.log(authToken);

        // If we had a front-end (like Angular, React or Vue)
        // return res.json({success: true, msg: 'User Logged in Successfully!', user: user, token: authToken})

        res.redirect('/contact-list');
      });
    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{

  // instantiate a new user object
  let newUser = new User
  ({
    username: req.body.username,
    EmailAddress: req.body.emailAddress,
    DisplayName: req.body.firstName + " " + req.body.lastName
  });

  console.log(newUser);

  User.register(newUser, req.body.password, function(err)
  {
    if(err)
    {
      if(err.name == "UserExistsError")
      {
        console.error('Error: Inserting New User');
        req.flash('registerMessage', 'User Already Exists');
        console.error('Error: User Already Exists');
      }
      else
      {
        req.flash('registerMessage', ' Registration Failure');
        console.error(err.name);
      }
      res.redirect('/register');
    }

    res.redirect('/contact-list');
  });
}
export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logOut();

    res.redirect('/login');
}