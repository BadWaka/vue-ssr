const Vue = require('vue');
const server = require('express')();
const fs = require('fs');
const createApp = require('./app');

const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
});

const port = 3000;

server.get('*', (req, res) => {
    const app = createApp({url: req.url});
    const context = {
        title: 'waka',
        meta: `
            <meta charset="utf8">
        `
    };
    renderer.renderToString(app, context, (err, html) => {
        console.log('html', html);
        if (err) {
            res
                .status(500)
                .end('Internal Server Error');
            return false;
        }
        res.end(html);
    });
});

server.listen(port);
console.log(`listening ${port} ...`);