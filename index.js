const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/chatgpt")
  .catch((err) => console.log(err));

const dialogSchema = new mongoose.Schema({
  response: String,
  message: String,
});

const Dialog = mongoose.model("Dialog", dialogSchema);

const configuration = new Configuration({
  organization: "org-9WevQbvggItOcNJtMQyQhS4L",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send(`Example app listening at ${port}`);
});

// app.post("/", (req, res) => {
//   Dialog.create({
//     message: req.body.message,
//     response: req.body.response,
//   })
//     .then((doc) => console.log(doc))
//     .catch((err) => console.log(err));
// });

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are NFT trader. Person: ${message}? You:`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);
  Dialog.create({
    response: message,
    message: response.data.choices[0].text,
  });
});

app.get("/dialogs", (req, res) => {
  Dialog.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
