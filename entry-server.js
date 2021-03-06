import {createApp} from './app';

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp();
        // 设置服务端 router 的位置
        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({code: 404});
            }
            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            resolve(app);
        }, reject);
    });
};