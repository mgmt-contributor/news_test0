const express = require('express');
const app = express();

app.get('/articles/:id', (req, res) => {
    const articleId = req.params.id;

    const webUrl = "";

    // Mock article data (can be fetched from a database)
    const article = {
        title: `Article ${articleId}`,
        description: `This is an article about topic ${articleId}.`,
        imageUrl: `https://dreamlandadventuretourism.com/wp-content/uploads/2025/01/img-world-ticket-from-dream.webp`,
        url: `${webUrl}/#/articles/${articleId}`
    };

    // Serve OG meta tags and then redirect
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta property="og:title" content="${article.title}">
        <meta property="og:description" content="${article.description}">
        <meta property="og:image" content="${article.imageUrl}">
        <meta property="og:url" content="${article.url}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <script>
            window.location.href = "http://localhost:60988/#/articles/${articleId}";
        </script>
    </head>
    <body>
    </body>
    </html>
    `);
});

app.listen(3000, () => console.log('Server running on port 3000'));
