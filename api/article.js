export default function handler(req, res) {
  const { id } = req.query; // Get the article ID from the URL

  // Replace with database or API fetch logic
  const articles = {
    "d184a7ae-7862-4bc0-88d5-72e9a5759b11330adeea-96f2-49e9-9fa3-063f7d71cf08": {
      title: "Breaking News: Flutter for Web is Here!",
      description: "Explore the latest advancements in Flutter web development.",
      image: "https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
    }
  };

  // Get the article data or use default values
  const article = articles[id] || {
    title: "Default Article",
    description: "This article is unavailable.",
    image: "https://i.pinimg.com/550x/cb/33/49/cb3349b86ca661ca61ae9a36d88d70d4.jpg"
  };

  // Send HTML response with Open Graph tags
  res.setHeader("Content-Type", "text/html");
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta property="og:title" content="${article.title}" />
        <meta property="og:description" content="${article.description}" />
        <meta property="og:image" content="${article.image}" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://news-test0-123.vercel.app/articles/${id}" />
        <meta http-equiv="refresh" content="0;url=https://news-test0-123.vercel.app/articles/${id}" />
      </head>
      <body></body>
      </html>
    `);
}
