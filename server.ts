import express from "express";
import helmet from "helmet";

const app: express.Express = express();
const port = 8000;

app.use(helmet());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`start express server: port ${port}`);
});
