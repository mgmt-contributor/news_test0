import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};


// Website ID
const websiteId = process.env.WEBSITE_ID;
// Website URL
const websiteUrl = "https://news-test0-123.vercel.app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchInformation(collectionName, channelLink, article_uid) {
  try {
    const q = query(
      collection(db, collectionName),
      where("information.channelId", "==", channelLink)
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.exists()) {
        const articlePublished = doc.data().information.articlePublished;

        if (articlePublished) {
          for (const content in articlePublished) {
            if (articlePublished[content].articleUid === article_uid) {
              let objectsContentInside = articlePublished[content].articleContent;
              let articleContent = "";

              for (const textInside in objectsContentInside) {
                if (typeof objectsContentInside[textInside]["insert"] === "string" && articleContent.length < 50) {
                  articleContent += objectsContentInside[textInside]["insert"].replaceAll("\n", " ");
                }
              }

              return {
                thumbnailImage: articlePublished[content].thumbnailImage,
                title: articlePublished[content].title,
                articleContent
              };
            }
          }
        }
      }
    }

    return null; // Return null if no match is found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';

  if (!id) {
    return res.status(400).json({ error: "Article ID is required" });
  }

  try {
    const result = await fetchInformation("news", websiteId, id);

    if (!result) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Check if it's a crawler or social media bot
    const isCrawler = /bot|crawl|facebook|twitter|linkedin|slack|whatsapp|telegram|discord/i.test(userAgent);

    if (isCrawler) {
      // For crawlers, return just the meta tags without redirect
      res.setHeader("Content-Type", "text/html");
      // For real users, redirect to hash-based URL
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="refresh" content="0; url=/#/articles/${id}">
        </head>
        <body></body>
        </html>
      `);
    } else {
      // For real users, redirect to the Flutter app
      res.setHeader("Content-Type", "text/html");
      res.res.res.re
      // Note: Using hash routing (#) to ensure Flutter handles it properly
    }
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





