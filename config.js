module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL || 'localhost:27017/authorcms',
  
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
  HASH_SALT: 10
};