export { };
import moduleAlias from 'module-alias';
require('dotenv/config');

moduleAlias.addAliases({
  datalayer  : __dirname + '/datalayer',
  middlewares: __dirname + '/middlewares',
  service    : __dirname + '/service',
  types      : __dirname + '/types',
  utils      : __dirname + '/utils',
});

require('service/api');
