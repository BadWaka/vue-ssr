const Vue = require('vue');
const server = require('express')();
const fs = require('fs');

const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
});

const port = 3000;

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 url 是: {{url}}</div>`
    });
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