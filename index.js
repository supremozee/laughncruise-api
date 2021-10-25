const express = require("express");
const app = express();
const dotenv = require("dotenv")
const authRoute = require("./routes/Auth")
const bodyParser = require("body-parser")
const knex = require("knex")
dotenv.config()
const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});
app.use(bodyparser.json())



app.use(authRoute)


app.listen("5000", ()=> {
    console.log("The app is running...")
})