import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log(`mongoose db is already connected...`);
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test"
    });

    isConnected = true;

    console.log(`Db connected`);
    return true;
  } catch (error) {
    console.log(`failed to connect, ${error}`);
  }
};
