const Hapi = require('@hapi/hapi');
const { start } = require('./index');
const { switchRtHandler } = require("./handler")
 
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin: ['*'],
        },
    },
  });
  
  server.route({
    // turn on realtime db
    method: 'POST',
    path: '/switch-rt',
    handler: switchRtHandler,
    });

  start();

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();