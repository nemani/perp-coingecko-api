import express from "express";
import * as controllers from "./controllers";

const app = express();
const path = require("path");

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/ref", (req, res) => {
  res.sendFile(path.join(__dirname, "public/refInput.html"));
});

app.get("/ref.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/refInput.css"));
});

app.get("/pairs", controllers.getPairs);
app.get("/pnl", controllers.getPnl);
app.get("/refBanner", controllers.getRefBanner);

// Routes
app.get("/*", (req, res) => {
  res.send(`Request received: ${req.method} - ${req.path}`);
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).send("An internal server error occurred");
  }
);

module.exports = app;
export default app;
