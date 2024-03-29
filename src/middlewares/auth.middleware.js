import { Response, verifyToken } from "../utils";

export async function isAuthenticated(req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(Response(401, "Unauthorized"));
        }
        const user = verifyToken(token);
        if (!user) {
            return res.status(401).json(Response(401, "Unauthorized"));
        }
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json(Response(500,"Internal Server Error",error));
    }
}

export async function isFaculty(req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(Response(401, "Unauthorized"));
        }
        const user = verifyToken(token);
        // if (!user || !(user.role === "faculty" ||user.role === "panel_head" || user.role === "admin")) {
        //     return res.status(401).json(Response(401, "Unauthorized"));
        // }
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json(Response(500,"Internal Server Error",error));
    }
}

export async function isPanelHead(req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(Response(401, "Unauthorized"));
        }
        const user = verifyToken(token);
        // if (!user || !(user.role === "panel_head" || user.role === "admin")) {
        //     return res.status(401).json(Response(401, "Unauthorized"));
        // }
        // req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json(Response(500,"Internal Server Error",error));
    }
}

export async function isAdmin(req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json(Response(401, "Unauthorized"));
        }
        const user = verifyToken(token);
        // if (!user || user.role !== "admin") {
        //     return res.status(401).json(Response(401, "Unauthorized"));
        // }
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json(Response(500,"Internal Server Error",error));
    }
}

export async function isStudent(req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json(Response(401, "Unauthorized"));
        }
        const user = verifyToken(token);
        // if (!user || user.role !== "student") {
        //     return res.status(401).json(Response(401, "Unauthorized"));
        // }
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json(Response(500,"Internal Server Error",error));
    }
}