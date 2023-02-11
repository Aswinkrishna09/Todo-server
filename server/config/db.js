import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb+srv://user:user@cluster0.wt2wkc8.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Mongodb connected ${con.connection.host}`
    );
  } catch (error) {
    console.log(`DB did'nt connect Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
