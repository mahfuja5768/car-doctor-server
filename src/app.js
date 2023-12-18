const express = require("express");
const { applyMiddleware } = require("./middlewares/applyMiddleware");
const connectDb = require("./db/connectDb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const authenticationRoutes = require("./routes/authentication/index");
const servicesRoutes = require("./routes/services");

applyMiddleware(app);

app.use(authenticationRoutes);
app.use(servicesRoutes);


app.get("/health", (req, res) => {
  // ConstantSourceNode.f //server thik e cholbe error hole
  res.send("doctor is running");
});

app.all("*", (req, res, next) => {
  console.log(req.url);
  const error = new Error(`the requested url is invalid : [${req.url}]`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const main = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`car doctor server is running on port ${port}`);
  });
};

main();
