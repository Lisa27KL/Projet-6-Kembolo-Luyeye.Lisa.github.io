const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOK_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid User ID !';
        } else {
            next();
        };

    } catch (error) {
        res.status(401).json({ message: error || ' Invalid request !' });
    }
}