import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Token nedostaje' });

    jwt.verify(token, 'tajni_kljuc', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token nije važeći' });

        req.user = user;
        next();
    });
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.uloga !== 'admin') {
        return res.status(403).json({ message: 'Nemaš dovoljne privilegije' });
    }
    next();
};
