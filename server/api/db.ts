import { Db, MongoClientOptions } from "mongodb";
import mongoose from "mongoose";

//url encode process.env.MONGODB_URI


const uri = process.env.MONGODB_URI || ""; // MongoDB Atlas URI here;

const options: MongoClientOptions = {}; // See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for options

async function connectDB() {
  try {
    await mongoose.connect(uri, {dbName: 'portfolio', ...options});
  } catch (err) {
    console.log(err);
  }
}


export default connectDB;
