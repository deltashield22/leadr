const router = require('express').Router()

const latinRoutes = require('./latin.routes');


module.exports = router

router.get('/favicon.ico', (req, res) => {
    res.sendStatus(204)
});

router.use('/api/latin', latinRoutes);

useAPIErrorHandlers(router);

function useAPIErrorHandlers(router) {
    router.use('/api/*', (req, res, next )=> {
        res.sendStatus(404);
    })

    router.use((err, req, res, next) => {
        if(!err) {
            return next();
        }
        res.sendStatus(500);
    })
}