const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    return res.status(401).json({ message: "unauthenticated: Please log in" });
  };

const isAuthoraized = (req, res, next) => {
    if (req.session.userId && req.session.userrole === "admin") {

      return next();
    }
    else if (req.session.userId){
        console.log(req.session.userrole)
        console.log(req.session.userId)
        return res.status(402).json({ message: "Unauthorized as admin: Please log in" });
    }
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  };

module.exports = {isAuthenticated,isAuthoraized}