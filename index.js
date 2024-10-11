import express from "express";
import axios from "axios";
import { API_KEY } from "./secrets.js";

const app = express();
const port = 3000;
var userLat = "";
var userLon = "";
const API_URL = "http://api.weatherapi.com/v1/forecast.json";

app.use(express.static("public"));

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.render("index.ejs", {data: null});
});

app.post("/get-weather-data", async (req, res) => {

    userLat = req.body.latitude;
    userLon = req.body.longitude;


    try {
        const result = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: `${userLat}, ${userLon}`,
                days: "3",
            }
        });


        const data = result.data;

        res.render("index.ejs", {data: data});

      } catch (error) {
        console.log(error.response);
        res.status(500);
      }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
