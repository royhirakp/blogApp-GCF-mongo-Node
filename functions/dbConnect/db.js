const mongoose = require("mongoose");

const mongourl = process.env.MongoUrl;

// connet mongodb atlas
mongoose.connect(mongourl).then(() => {
  console.log("DB connected");
});
