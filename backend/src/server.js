import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./routes/helloRoute.js";
import noteRouter from "./routes/notesRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());




const port = 3000;
app.use("/", helloRouter);
app.use("/notes", noteRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    testConnection();
});