const {Pinecone} = require('@pinecone-database/pinecone');
const OpenAI = require("openai");
const system_prompt = require("./system_prompt");

require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index('hackathon2024').namespace("ns1");;

const judge_story = async (text) => {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    });

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding
    });

    let data = "";

    results.matches.forEach((match) => {
        data += `\n
        Title ${match.id}
        Rank: ${match.metadata.rank}
        Story: ${match.metadata.story}
        \n`
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: system_prompt },
            {
                role: "user",
                content: JSON.stringify("Here is Top 3 similar stories: \n" + data + "\n Here is the inputted story: \n" + text)
            },
        ],
    });
    return completion.choices[0].message.content;
}

module.exports = judge_story;

// judge_story("A young man receives a strange pet with three specific rules: no bright light, no water, and no feeding after midnight. When these rules are broken, the cute creature spawns destructive monsters that terrorize a small town")