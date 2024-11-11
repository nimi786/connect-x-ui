const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'connect-x-ui',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

