import express from "express"; // can require but there is babel

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs"); // typing code login into html
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
