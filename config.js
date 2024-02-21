const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
const envFilePath = `.env.${env}`;

dotenv.config({ path: envFilePath });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  ClientID:  process.env.ClientID||"50dd6a40-afa6-4484-81db-bed9c37989f5",
  ClientSecret: process.env.ClientSecret || "gT3hW1yT8fV8yH7cC1fO3bE8jG1dH1xE1yW5dU8rU6yF2fA2wS",
  GrantType: process.env.GrantType || "client_credentials",
  JWT: process.env.JWT || "1122334455"
};
