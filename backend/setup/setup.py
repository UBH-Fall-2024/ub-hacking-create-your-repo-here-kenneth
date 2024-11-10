from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
import os
import json

load_dotenv()

openai = OpenAI()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index("hackathon2024")


data = json.load(open("./data.json"))

processed_data = []
for sample in data:
    response = openai.embeddings.create(
        input=sample["story"],
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
    processed_data.append({
        "values": embedding,
        "id": sample["title"],
        "metadata": {
            "story": sample["story"],
            "rank": sample["rank"]
        }
    })

index.upsert(vectors=processed_data, namespace="ns1")


