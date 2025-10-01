const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
var cors = require("cors");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
//Avalaible routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`iNotebook backend is running on port ${PORT}`)
);

// zrTBX1yKcxMfVSP4;
// sameenoctetsolutionsio_db_user;
// mongodb+srv://sameenoctetsolutionsio_db_user:zrTBX1yKcxMfVSP4@inotebook.juso1tu.mongodb.net/
