import express from "express";
import emailRouter from "./emailRoutes.js";

const app = express();
app.use(express.json());

app.use("/", (req, res, next) => {
    console.log("Hello from Email Service🎉");
    next();
});

app.use("/api/v1/email", emailRouter);

export default app;
