const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config.js");
const bankAlfalahRoutes = require("./routes/bankAlfalah.js");
const app = express();

app.use(bodyParser.json());

app.use("/bankalfalah/sb", bankAlfalahRoutes);

app.listen(CONFIG.PORT, () => {
  console.log(`BANK ALFALAH listening at ${CONFIG.HOST} ${CONFIG.PORT}`);
});
