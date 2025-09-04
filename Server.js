import express from "express";
import connectDB from "./config/database.js";
import farmerRouter from "./routes/farmer.route.js";
import buyrouter from "./routes/buy.route.js";
import productRouter from "./routes/product.route.js";
import transaction from "./routes/transaction.route.js";
import communityRouter from "./routes/community.route.js";


const app = express();

app.use(express.json())
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  console.log('Database is connected successfully')
}).catch(err => {
  console.error('Database connection failed!!:', err)
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`The server is running on \`http://localhost:${PORT}\``);
});

app.use("/api/", farmerRouter);
app.use("/api", buyrouter)
app.use("/api", productRouter)
app.use("/api", transaction)
app.use("/api", communityRouter);



