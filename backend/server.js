express = require('express');
cors = require('cors');
const router = require("./routes/routes.js");
const {auth, requiresAuth} = require("express-openid-connect");
const path = require("path");

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:8080',
    clientID: 'etndCiMjxiaNulwmHYb7XzcyjpZ9ZJiA',
    issuerBaseURL: 'https://dev-e36p0658d454xsx0.us.auth0.com'
}

app.use(auth(config));

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
app.use(express.static(path.join(__dirname,"../","frontend","build")));

app.get('/get_auth', (req, res) => {
    try{
        res.status(200).json({status:
                req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
        })
    }catch(e){
        console.log(e);
    }
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.status(200).json(JSON.stringify(req.oidc.user, null, 2));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../","frontend","build", "index.html"));
});


app.listen("8080", () => {
    console.log("Listening on port 8080");
})



