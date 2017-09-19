/*
 *  Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

  https://joinup.ec.europa.eu/software/page/eupl

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the Licence for the specific language governing permissions and
limitations under the Licence. */

var convict = require('convict');
var request = require('request');
var fs = require('fs');

module.exports = new Promise(function(resolve, reject) {
  var conf = convict({
    env: {
      doc: 'The applicaton environment.',
      format: ['production', 'development'],
      default: 'development',
      env: 'NODE_ENV'
    },
    tiamatEnv: {
      doc: 'Back end applicaton environment.',
      format: ['production', 'development', 'test'],
      default: 'development',
      env: 'TIAMAT_ENV'
    },
    configUrl: {
      doc: 'URL for where to read the configuration',
      format: '*',
      default: 'http://rutebanken.org/do_not_read',
      env: 'CONFIG_URL'
    },
    tiamatBaseUrl: {
      doc: 'Base URL for for tiamat graphql endpoint',
      format: 'url',
      default: 'https://www-test.entur.org/api/tiamat/1.0/graphql',
      env: 'TIAMAT_BASE_URL'
    },
    endpointBase: {
      doc: 'Base URL for for timat including slash',
      format: String,
      default: '/',
      env: 'ENDPOINTBASE'
    },
    OSMUrl: {
      doc: 'URL for OSM map',
      format: String,
      default: 'https://www-test.entur.org/api/map/1.0/{z}/{x}/{y}.png',
      env: 'OSM_URL'
    },
    authServerUrl: {
      doc: 'URL to keycloak auth server',
      format: String,
      default: 'https://www-test.entur.org/auth/',
      env: 'AUTH_SERVER_URL'
    }
  });

  // If configuration URL exists, read it and update the configuration object
  var configUrl = conf.get('configUrl');

  if (configUrl.indexOf('do_not_read') == -1) {
    // Read contents from configUrl if it is given
    request(configUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        conf.load(body);
        conf.validate();
        resolve(conf);
      } else {
        reject('Could not load data from ' + configUrl, error);
      }
    });
  } else {
    console.log(
      'The CONFIG_URL element has not been set, so you use the default dev-mode configuration'
    );
    conf.validate();
    resolve(conf);
  }
});
