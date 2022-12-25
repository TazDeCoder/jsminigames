require('dotenv').config();

function getDefault(value, defaultValue) {
  if (!value || value === 'undefined') {
    return defaultValue;
  }

  return value;
}

const productionHosts = ['https://jsminigames.vercel.app'];
const devHosts = ['http://localhost:3000'];

module.exports = {
  IS_DEVELOPMENT:
    getDefault(process.env.NODE_ENV, 'development') !== 'production',
  ALLOWLIST_HOSTS:
    getDefault(process.env.NODE_ENV, 'development') === 'production'
      ? productionHosts
      : devHosts,
  PORT: process.env.PORT || 8080,
  MONGODB_URI:
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jsmgTestDB',
};
