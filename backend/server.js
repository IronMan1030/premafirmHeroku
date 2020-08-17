const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const productRouter = require("./routes/products");
const userRouter = require("./routes/user");

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(cors());
    app.use(express.json());

    app.use("/api/v1/product", productRouter);
    app.use("/api/v1/user", userRouter);

    const uri = process.env.ATLAS_URI;

    await mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(uri);
        });
    mongoose.set("useFindAndModify", false);
    app.listen(port, () => {
        console.log(`server is running on port:${port}`);
    });
};
startServer();
