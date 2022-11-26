module.exports = function errorHandler(error, req, res, next) {
    if (error.status) {
        res.status(error.status).json({ error: error });
    } else {
        res.status(400).json({ error })
    }
}