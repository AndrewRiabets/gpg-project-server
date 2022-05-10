import db from "./db/db";
import app from "./app";

const PORT = process.env.PORT || 5001;

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`);
});
