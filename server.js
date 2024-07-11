import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import Initializer from "./initializer.js";

const initializer = new Initializer();
await initializer.init();

const port = process.env.PORT || 5570;
app.listen(port, (req, res) => {
    console.log(`Email service is running on port ${port}`);
});
