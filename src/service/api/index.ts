require('datalayer/databases/mongo');

import signale from 'signale';
import morgan from 'morgan';
import restify from 'restify';
import { Router, } from 'restify-router';
import corsMiddleware from 'restify-cors-middleware2';

import project from 'datalayer/config/project';
import RouterManager from 'service/api/routes';
import { allowOrigins, getDominio, listAllRoutes, } from 'utils';

const server = restify.createServer({
  name: project.restify.name,
});

const cors = corsMiddleware({
  allowHeaders : [ 'X-XSRF-TOKEN', 'Authorization', ],
  credentials  : true,
  exposeHeaders: [],
  origins      : allowOrigins(),
});

const router = new Router();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(morgan('dev'));

router.add('/api/v1', RouterManager);
router.applyRoutes(server);

const dominio = getDominio(server.url, project.restify.port);

listAllRoutes(server, dominio);

server.listen(project.restify.port, async () => {
  const launchDate = new Date();
  signale.success(`[TAOS] Server launch ${launchDate}`);
  signale.success(`[TAOS] Explore this api in: ${dominio}`);
});
