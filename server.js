const server = require('express')();
const port = 3000;
const createApp = require('./app');
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
    const context = {
        url: req.url
    };
    createApp(context).then(app => {
        renderer.renderToString(app, (err, html) => {
            if (err) {
                if (err.code === 404) {
                    res
                        .status(404)
                        .end('Page not found');
                } else {
                    res
                        .status(500)
                        .end('Internal Server Error');
                }
            } else {
                res.end(html);
            }
        });
    });
});

server.listen(port);
console.log(`listening ${port} ...`);