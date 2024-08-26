const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};

module.exports = verifyToken;
