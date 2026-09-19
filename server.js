const express = require("express");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app =  express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);  

app.get("/",(req,res)=>{
    res.json({
        status:true,
        message:"E-Commerce Backend API is running",
    });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
