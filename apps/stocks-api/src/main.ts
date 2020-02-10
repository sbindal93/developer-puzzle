/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { fetchQuote } from './app/price-query.api';
import * as catboxMemory from '@hapi/catbox-memory';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    cache: {
      name: 'my_cache',
      shared: true,
      provider: { constructor: catboxMemory }
    }
  });
  const stockCache = server.cache({
    cache: 'my_cache',
    expiresIn: 60 * 1000,
    segment: 'customsegment',
    generateFunc: async (param) => {
      try {
        let [symbol, period] = param['id'].split(':');
        return await fetchQuote(symbol, period);
      }
      catch (err) {
        console.log('error in api call', err);
        return err;
      }
    },
    generateTimeout: 4000
  });

  server.route({
    method: 'GET',
    path: '/api/beta/stock/{symbol}/chart/{period}',
    handler: async (request, h) => {
      let { symbol, period } = request.params;
      let id = `${symbol}:${period}`;
      let result = await stockCache.get({ id });
      return h.response(result);
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
