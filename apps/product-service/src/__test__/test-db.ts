import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const DB = new MongoMemoryServer();

const connect = async () => {
  try {
    await DB.start();
    const uri = DB.getUri();
    await mongoose.connect(uri);
    console.log(`Database: ${uri} (connected)`);
  } catch (err) {
    console.log("error DB Connection: ", err);
  }
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await DB.stop();
};

const clearData = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const TestDB = {
  connect,
  disconnect,
  clearData,
};
