import jsonwebtoken from "jsonwebtoken";

export const verifyToken = async  (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY  || "TOKEN_KEY");
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}