import express from "express";
import cors from "cors";
import "dotenv/config";
import leadRoutes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware 
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Lead Manager API is running." });
});

// Routes
app.use("/leads", leadRoutes);

// status
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});