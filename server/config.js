const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shopdb";
const SECRET_KEY = process.env.SECRET_KEY || "iamsososecret!youcaneverguess";
const JWT_EXP = process.env.JWT_EXP || "1h";
const port = process.env.PORT || 5000;

module.exports = { SECRET_KEY, MONGO_URI, JWT_EXP, port };
