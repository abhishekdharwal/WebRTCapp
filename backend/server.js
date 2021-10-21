require("dotenv").config(); // all credentials are available here
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const DbConnect = require("./database");
const router = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 5500;

DbConnect();
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// const corsOptions = {
//   origin: "*",
//   "Access-Control-Allow-Origin": "*",
// };
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello for express");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
