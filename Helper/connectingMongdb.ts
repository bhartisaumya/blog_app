import mongoose from "mongoose";

const MONGO_URL: string = process.env.MONGO_URL || 'a'

mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB Connected: " + process.env.MONGO_URL)
})
.catch((err: Error) => {
    console.log(err.message);
})

process.on("beforeExit", () => {
    mongoose.disconnect();
    process.exit(0);
});