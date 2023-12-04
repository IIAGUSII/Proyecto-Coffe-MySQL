import express from "express";
import cors from "cors";
import { router as productsRt } from "./src/routes/productsRt.js";
import { router as userRt } from "./src/routes/usersRt.js";
const PORT = process.env.PORT ?? 3000;
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors("*"));

app.use(express.static("public"));
app.listen(PORT, (err) => {
  err
    ? console.log("servidor no esta corriendo")
    : console.log(`servidor esta corriendo en localhost/${PORT} `);
});

app.use("/products", productsRt);
app.use("/users", userRt);
