import express from "express";
import helmet from "helmet";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require("./src/controller/cdk.controller");

const app: express.Express = express();
const port = 8000;

app.use(express.json());
app.use(helmet());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`start express server: port ${port}`);
});

module.exports = app;
