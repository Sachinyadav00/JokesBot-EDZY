const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const initBot = require("./bot");

(async () => {
  await connectDB();
  initBot();
})();

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
