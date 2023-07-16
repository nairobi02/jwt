import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectToDB from "./database/db.js";
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/", userRoutes);

app.get("/set-cookies", (req, res) => {
  res.cookie("new_user", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  // res.setHeader("Set-Cookie", "new_user=true; SameSite=None; Secure"); // Set the cookie with desired properties
  res.send("you got the cookies");
});
app.get("/read-cookies", (req, res) => {
  // res.cookie("new_user", false);
  const cookies = req.cookies;
  res.json(cookies);
});

const establishConnection = async () => {
  await connectToDB();
  startServer();
};

establishConnection();
function startServer() {
  return app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
}
