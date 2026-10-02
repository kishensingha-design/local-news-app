import feedparser
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# Initialize Firebase from GitHub Secrets
firebase_creds_json = os.environ.get("FIREBASE_CREDENTIALS")
if firebase_creds_json:
    cred_dict = json.loads(firebase_creds_json)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
else:
    print("Firebase credentials not found in environment variables.")

# List of target feeds (Google News RSS & YouTube RSS per region)
feeds = [
    {
        "url": "https://news.google.com/rss/search?q=Patna+government+schemes",
        "city": "Patna",
        "state": "Bihar",
        "category": "Govt Scheme"
    },
    {
        "url": "https://news.google.com/rss/search?q=Jaipur+government+schemes",
        "city": "Jaipur",
        "state": "Rajasthan",
        "category": "Govt Scheme"
    }
]

def sync_news():
    if not firebase_creds_json:
        return
        
    for source in feeds:
        parsed_feed = feedparser.parse(source["url"])
        
        for entry in parsed_feed.entries[:5]: # Grab top 5 latest items
            news_item = {
                "title": entry.title,
                "description": entry.get("summary", "Read full details inside the app."),
                "video_url": entry.link if "youtube" in entry.link else "",
                "city": source["city"],
                "state": source["state"],
                "category": source["category"],
                "created_at": firestore.SERVER_TIMESTAMP
            }
            
            # Use unique hash of title as document ID to prevent duplicates
            doc_id = str(abs(hash(entry.title)))
            db.collection("news").document(doc_id).set(news_item, merge=True)
            
    print("News synchronization completed successfully!")

if __name__ == "__main__":
    sync_news()
