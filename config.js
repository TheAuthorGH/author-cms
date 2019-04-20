module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL || 'localhost:27017/authorcms',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'localhost:27017/authorcms_test',
  
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
  HASH_SALT: 10,

  ROUTE_API: '/api'
};