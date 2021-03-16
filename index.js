import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

require('dotenv').config();
const aws = require('aws-sdk');
let s3 = new aws.S3({
  DbConnect: process.env.DB_CONNECT
});


//const dbUrl = "mongodb://localhost:27017/perez_perez"; // Mongo Local
const dbUrl = s3.config.DbConnect; // MongoDb Atlas


mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mongoose) => console.log("conectado a la DB"))
  .catch((err) => console.log(err));

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

const history = require("connect-history-api-fallback");
app.use(history());

app.set("port", process.env.PORT || 3004);
app.listen(app.get("port"), () => {
  console.log("App listening on port " + app.get("port"));
});
