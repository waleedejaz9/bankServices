const express = require("express");
const generateToken = require("../utils/generateToken");
const CONFIG = require("../config");
const router = express.Router();
const helpers = require("../utils/helpers");
const { protect } = require("../middlewares/auth");
const lodash = require("lodash");

router.get("/oauthgeneratetoken/OAuthGenerateToken", async (req, res) => {
  try {
    const ClientID = req.query.ClientID;
    const ClientSecret = req.query.ClientSecret;
    const GrantType = req.query.GrantType;
    const checkToken =
      ClientID === CONFIG.ClientID &&
      ClientSecret === CONFIG.ClientSecret &&
      GrantType === CONFIG.GrantType;

    if (ClientID !== CONFIG.ClientID || ClientSecret !== CONFIG.ClientSecret) {
      return res.status(200).json({
        Exception: {},
        Exception1: ",",
        Exception2: "",
      });
    }
    if (GrantType !== CONFIG.GrantType || !checkToken) {
      await helpers.run();
      return res.status(500).json({
        httpCode: "500",
        httpMessage: "Internal Server Error",
        moreInformation: "Failed to establish a backside connection",
      });
    }
    return res.status(200).json({
      token_type: "bearer",
      access_token: generateToken(ClientID, ClientSecret),
      expires_in: 3600,
      consented_on: 1708422409,
      scope: "GetToken",
    });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/opentitlefetch/v1", protect, async (req, res) => {
  try {
    const ClientId = req.headers["x-ibm-client-id"];
    const ClientSecret = req.headers["x-ibm-client-secret"];
    let actualData = {
      dateTime: "1105171432",
      amount: "100",
      rrn: "858565171121",
      fromAccountNumber: "123456789111",
      toAccountNumber: "12345678911112",
      toBankIMD: "221166",
      beneficiaryBankName: "JS",
      fromBankIMD: "627100",
    };
    if (!lodash.isEqual(req.body, actualData)) {
      return res.json({
        httpCode: "403",
        httpMessage: "bad request",
        moreInformation: "body attributes do not match actual data.",
      });
    }
    if (
      !ClientId ||
      !ClientSecret ||
      ClientId != CONFIG.ClientID ||
      ClientSecret != CONFIG.ClientSecret
    ) {
      return res.json({
        httpCode: "401",
        httpMessage: "Unauthorized",
        moreInformation: "Client id in wrong location.",
      });
    }
    return res.status(200).json({
      ResponseCode: "00",
      PAN: "6271008585654171432",
      Amount: "000000000100",
      STAN: "171121",
      Date: "1105",
      Time: "171432",
      RRN: "858565171121",
      AuthID: "314522",
      ToBankIMD: "22116600000",
      AccountNumberTo: "12345678911112",
      AccountTitleTo: "ZEESHAN AHMED                 ",
      BranchNameTo: "JS                  ",
      BankName: "JS                  ",
      ResponseDetail: "PROCESSED OK",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/funds-transfer-bafl/fundstransferbafl",
  protect,
  async (req, res) => {
    try {
      const ClientId = req.headers["x-ibm-client-id"];
      const ClientSecret = req.headers["x-ibm-client-secret"];
      const {
        ChannelId,
        SourceAccount,
        ReferenceNumber,
        AccountBankIMD,
        DestinationAccount,
        Amount,
      } = req.query;
      if (
        !ChannelId ||
        !SourceAccount ||
        !ReferenceNumber ||
        !AccountBankIMD ||
        !Amount ||
        !DestinationAccount
      ) {
        return res.json({
          httpCode: "403",
          httpMessage: "bad request",
          moreInformation: "required params are missing",
        });
      }
      if (
        !ClientId ||
        !ClientSecret ||
        ClientId != CONFIG.ClientID ||
        ClientSecret != CONFIG.ClientSecret
      ) {
        return res.json({
          httpCode: "401",
          httpMessage: "Unauthorized",
          moreInformation: "Client id in wrong location.",
        });
      }
      return res.json({
        Response: {
          ResponseCode: "00",
          ResponseDescription: "Success",
          data: [
            {
              ReferenceNumber: "5197463274434875",
            },
          ],
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.post("/inter-bank-fund-transfers/v1", protect, async (req, res) => {
  try {
    const ClientId = req.headers["x-ibm-client-id"];
    const ClientSecret = req.headers["x-ibm-client-secret"];
    if (
      !ClientId ||
      !ClientSecret ||
      ClientId != CONFIG.ClientID ||
      ClientSecret != CONFIG.ClientSecret
    ) {
      return res.json({
        httpCode: "401",
        httpMessage: "Unauthorized",
        moreInformation: "Client id in wrong location.",
      });
    }
    let actualData = {
      toBankIMD: "221166",
      toAccountNumber: "12345678911112",
      fromAccountNumber: "00051005398056",
      rrn: "310899100722",
      dateTime: "0901164101",
      beneficiaryBankName: "1LINK BANK LIMITED ",
      senderName: "Sender",
      accountTitle: "ZEESHAN AHMED ",
      branchName: "1LINK MAIN BRANCHPRKTOWER",
      amount: "1.00",
      fromBankIMD: "627100",
    };
    if (!lodash.isEqual(req.body, actualData)) {
      return res.json({
        httpCode: "403",
        httpMessage: "Unauthorized",
        moreInformation: "body attributes donot match actual body",
      });
    }
    return res.status(200).json({
      ResponseCode: "00",
      PAN: "8585654171432000000",
      TransactionAmount: "000000000100",
      DateTime: "",
      STAN: "100722",
      Date: "0901",
      Time: "164101",
      SettlementDate: "1008",
      RRN: "310899100722",
      AuthorizationIdentificationResponse: "000000",
      ToBankIMD: "22116600000",
      AccountNumberTo: "12345678911112",
      ResponseDetail: "PROCESSED OK",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
