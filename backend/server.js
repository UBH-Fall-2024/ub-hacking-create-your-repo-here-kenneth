express = require('express');
cors = require('cors');
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));
app.use("/", router);


app.listen("8080", () => {
    console.log("Listening on port 8080");
})



