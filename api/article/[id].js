export default function handler(req, res) {
    const { id } = req.query;  // Get the article ID from the URL

    // Sample data (Replace with your database or API fetch logic)
    const articles = {
        "1": {
            title: "Flutter Web: The Future of PWAs",
            description: "Learn how Flutter Web is changing Progressive Web Apps!",
            image: "https://yourapp.com/assets/article-1.jpg"
        },
        "2": {
            title: "How to Build a Full-Stack Flutter App",
            description: "A complete guide to full-stack Flutter development.",
            image: "https://yourapp.com/assets/article-2.jpg"
        }
    };

    const article = articles[id] || {
        title: "Article Not Found",
        description: "The requested article does not exist.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIjeTziSjCZpmM8JZ9GB3Er1ELEAzyTEtgW8qkNUPi4Hthpi5Yb-4b47INtfVfAfLdUY"
    };

    // Serve Open Graph meta tags dynamically
    res.setHeader("Content-Type", "text/html");
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta property="og:title" content="${article.title}" />
            <meta property="og:description" content="${article.description}" />
            <meta property="og:image" content="${article.image}" />
            <meta property="og:url" content="https://news-test0-123.vercel.app/#/articles/${id}" />
            <meta name="twitter:card" content="summary_large_image">
            <meta http-equiv="refresh" content="0; url=https://news-test0-123.vercel.app/#/articles/${id}" />
            <title>${article.title}</title>
        </head>
        <body>
            <p>Redirecting...</p>
        </body>
        </html>
    `);
}
