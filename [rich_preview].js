export default function handler(req, res) {
    const { id } = req.query;

    // Fetch article data dynamically (mock example)
    const article = {
        id,
        title: `Article ${id}`,
        description: `Read about Article ${id} in detail.`,
        image: `https://yourapp.vercel.app/assets/article-${id}.jpg`,
        url: `https://yourapp.vercel.app/#/articles/${id}`
    };

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta property="og:title" content="${article.title}" />
            <meta property="og:description" content="${article.description}" />
            <meta property="og:image" content="${article.image}" />
            <meta property="og:url" content="${article.url}" />
            <meta http-equiv="refresh" content="0; url='${article.url}'" />
        </head>
        <body>
        </body>
        </html>
    `);
}
