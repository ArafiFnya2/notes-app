import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./routes/helloRoute.js";
import noteRouter from "./routes/notesRoute.js";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: 'https://kodein-notes-omega.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());


const port = 3000;
app.use("/", helloRouter);
app.use("/notes", noteRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    testConnection();
});