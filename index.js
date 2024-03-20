require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./src/config/db")
const characterRouter = require("./src/api/routes/character")



const app = express()

connectDB()

app.use(cors())

app.use("/api/v1/characters", characterRouter)

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found")
})

app.listen(3000, () => {
  console.log("http://localhost:3000");
})