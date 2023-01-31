require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const { TEL_TOKEN, URL_NGROK } = process.env;

const TEL_API = `https://api.telegram.org/bot${TEL_TOKEN}`;

const WEBHOOK_END = "/webhook" + TEL_TOKEN;

const WEBHOOK_URL = URL_NGROK + WEBHOOK_END;

const setWebhookUrl = async () => {
    await axios.get(`${TEL_API}/setWebhook?url=${WEBHOOK_URL}`);
};

app.post(WEBHOOK_END, async (req, res) => {
  const chat_id = req.body.message.chat.id;
  const text = req.body.message.text;

  await axios.post(`${TEL_API}/sendMessage`, {  
    chat_id, text
  });

  return res.send("OK");
});



app.listen(process.env.PORT || 8080, async () => {
  console.log(`Server is listening on port ${process.env.PORT || 8080}`);
  await setWebhookUrl();
});