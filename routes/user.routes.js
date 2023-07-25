const express = require('express');
const { registerUsers, loginUser } = require('../controller/user.controller');
const routes=express();
routes.post("/Register",registerUsers);
routes.post("/login",loginUser);
module.exports=routes;