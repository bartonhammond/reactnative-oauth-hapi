var Hapi = require('hapi');
var Bell = require('bell');
var AuthCookie = require('hapi-auth-cookie');
var CONFIG = require('./config');

var server = new Hapi.Server();
server.connection({
  port: 5000,
  routes: {
    cors: true
  }
});

server.register([Bell, AuthCookie], function (err) {

  if (err) {
    console.error(err);
    return process.exit(1);
  }

  var authCookieOptions = {
    password: 'cookie-encryption-password', //Password used for encryption
    cookie: 'sitepoint-auth', // Name of cookie to set
    isSecure: false
  };

  server.auth.strategy('site-point-cookie', 'cookie', authCookieOptions);

  var bellAuthOptions = {
    provider: 'github',
    password: 'github-encryption-password', //Password used for encryption
    clientId: CONFIG.github.clientId,
    clientSecret: CONFIG.github.clientSecret,
    isSecure: false //true for https

  };

  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

  server.auth.default('site-point-cookie');

  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        auth: {
          mode: 'optional'
        },
        handler: function (request, reply) {
          if (request.auth.isAuthenticated) {
            return reply('welcome back ' +
                         request.auth.credentials.profile.displayName);
          }
          return reply('hello stranger!');
        }
      }
    }, {
      method: 'GET',
      path: '/account',
      config: {
        handler: function (request, reply) {
          return reply(request.auth.credentials.profile);
        }
      }
    }, {
      method: ['GET','POST'],
      path: '/login',
      config: {
        auth: 'github-oauth',
        handler: function (request, reply) {

          if (request.auth.isAuthenticated) {
            request.cookieAuth.set(request.auth.credentials);
            return reply('Hello ' + request.auth.credentials.profile.displayName);
          }
            return reply('Not logged in...').code(401);
        }
      }
    }, {
      method: 'GET',
      path: '/logout',
      config: {
        auth: false,
        handler: function (request, reply) {
          request.cookieAuth.clear();
          return reply.redirect('/');
        }
      }
    }
  ]);

  server.start(function (err) {

    if (err) {
      console.error(err);
      return process.exit(1);
    }

    console.log('Server started at %s', server.info.uri);
  });


});


