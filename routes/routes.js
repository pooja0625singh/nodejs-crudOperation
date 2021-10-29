// import other routes
const orderRoutes = require('./orders');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('nodejs works!!!');
    });

    // // other routes
    orderRoutes(app, fs);

};

module.exports = appRouter;