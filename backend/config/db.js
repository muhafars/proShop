import mongoose from "mongoose";
import color from "colors";

const timeString = new Date().toLocaleTimeString([], { hour12: false });
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.zebra,
      `\n\t~~~~~~~~~~~~~~ Changes at : ${timeString} ~~~~~~~~~~~~~~~~~~~~~`
    );
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default dbConnect;
