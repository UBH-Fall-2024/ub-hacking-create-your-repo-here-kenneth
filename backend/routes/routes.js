express = require("express");
judge = require("../util/genai-rank");
client = require("../util/mongo");

database = client.db("data");

data_collection = database.collection("data");

const router = express.Router();

router.post("/save", async (req, res) => {
    try {
        let {story, title, rank} = req.body;
        const data = await data_collection.findOne({"category": rank});

        title = title.replace(/(<([^>]+)>)/ig, '');
        story = story.replace(/(<([^>]+)>)/ig, '');

        const stories = [...data["stories"], {title, story}];

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