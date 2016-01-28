/**
 * # Http
 * 
 *
 */
'use string';

require('regenerator/runtime');
import _ from 'underscore';

class Http{
  constructor() {
  this.API_BASE_URL= 'http://localhost:5000';
  }


  async logout() {
    return await this._fetch({
      method: 'GET',
      url: '/logout'
    })
      .then((response) => {
        console.log('http.logout.reponse',response);
        if ((response.status === 200 || response.status === 201)) {
          return true;
        } else {
          throw(false);
        }
      })
      .catch((error) => {
        console.log('http.logout.error',error);
        throw(error);
      });
  }
  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null
    }, opts);
    
    let reqOpts = {};
    reqOpts.method= opts.method;
    console.log('http.reqOpts', reqOpts);
    return await fetch(this.API_BASE_URL + opts.url, reqOpts);
  }
};

module.exports = Http;
