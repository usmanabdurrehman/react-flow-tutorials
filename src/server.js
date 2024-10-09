import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

let data;

app.get("/data", (req, res) => {
  res.send(data);
});

app.post("/data", (req, res) => {
  const { data: newData } = req.body;
  data = newData;
  setTimeout(() => {
    res.send({ status: true });
  }, 1200);
});

app.listen(7000, () => {
  console.log("Server is listening");
});
