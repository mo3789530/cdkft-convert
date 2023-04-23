import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post("/cdk", (req, res) => {
  (async () => {
    res.json({});
  })().catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

module.exports = router;
