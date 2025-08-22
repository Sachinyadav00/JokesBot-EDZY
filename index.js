const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const initBot = require("./bot");

(async () => {
  await connectDB();
  initBot();
})();
