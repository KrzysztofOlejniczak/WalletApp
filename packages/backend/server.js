const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const connection = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

connection
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((err) => {
    console.log(`Database connection failed. Error message: ${err.message}`);
    process.exit(1);
  });
