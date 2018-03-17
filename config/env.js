const dotenvVars = require('dotenv').config().parsed;

// Put any new environment variable keys here
const APP_ENV_VARS = ['NODE_ENV', 'PUBLIC_URL'];

if (!process.env.NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

function getClientEnvironment() {
  const raw = Object.keys(dotenvVars || {}).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    APP_ENV_VARS.reduce((env, key) => {
      env[key] = process.env[key] || '';
      return env;
    }, {})
  );

  const forWebpackDefinePlugin = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      if (key === 'NODE_ENV') {
        env[key] = JSON.stringify(raw[key]);
      } else {
        env[key] = `process.env.${key}`;
      }
      return env;
    }, {})
  };

  const forIndexHtml = JSON.stringify({
    env: raw
  });

  return { raw, forIndexHtml, forWebpackDefinePlugin };
}

module.exports = getClientEnvironment;
