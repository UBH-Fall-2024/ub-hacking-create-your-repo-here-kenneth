express = require("express");
judge = require("../util/genai-rank");
client = require("../util/mongo");

database = client.db("data");

data_collection = database.collection("data");
user_collection = database.collection("user");

const router = express.Router();

router.post("/get_user_post", async (req, res) => {
    try {
        const { user } = req.body;
        console.log("hi", user);
        const response = await user_collection.findOne({user});
        console.log(response);
        res.status(200).json(response.stories);
    }catch (e){
        res.status(400);
    }
})
router.post("/save", async (req, res) => {
    try {
        let {story, title, rank, user} = req.body;
        title = title.replace(/(<([^>]+)>)/ig, '');
        story = story.replace(/(<([^>]+)>)/ig, '');

        const data = await data_collection.findOne({"category": rank});

        const retrieved_user = await user_collection.findOne({user});

        if (retrieved_user === null){
            await user_collection.insertOne({user: user, stories: [{title, story}]});
        }else{
            const stories = [...retrieved_user["stories"], {title, story}];
            await user_collection.findOneAndUpdate({user}, {$set: {stories}})
        }


        const stories = [...data["stories"], {title: title, story: story, author: user}];

        console.log(stories);

        await data_collection.findOneAndUpdate({"category": rank}, {$set: {stories}})

        res.status(200).json({message: "Story uploaded!"});
    }catch (e){
        console.log(e);
        res.status(400).json({error: "Failed to upload your story, try again"});
    }
})

router.post("/chat", async (req, res) => {
    try {
        const text = req.body.story.replace(/(<([^>]+)>)/ig, '');
        const response = await judge(text);
        res.status(200).json({response});
    }catch (e) {
        console.log(e);
        res.status(400).json({error: "Failed to judge your story, try again"});
    }
})

router.get("/retrieve_stories", async (req, res) => {
    try {
        const stories = await (await data_collection.find()).toArray();

        res.status(200).json({stories});
    }catch (e){
        console.log(e);
        res.status(400).json({error: e});
    }
})



module.exports = router;