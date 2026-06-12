import * as utils from "../utils/utils.js";


export function getAuthenticatedUser(req) {
    const token = req.cookies.token;

    if (!token) {
        return null;
    }

    const decoded = utils.verifyJWT(token)

    if (!decoded) {
        return null;
    }

    return decoded;
}

export async function authMiddleware(req, res, next) {
    const user = getAuthenticatedUser(req);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
}
