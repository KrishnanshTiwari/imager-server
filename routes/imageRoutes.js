import express from "express";
import * as dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: "r8_WvvnQJxuSpyUyFlnY35Z0yCHcChctYh4ENCKh",
});

router.route("/").get((req, res) => {
  res.send("Hello");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
        }
      }
    );
    //console.log(output);
    
    res.status(200).json(output);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
