var assert = require('assert');
var jsonToXmlObj = require('./index.js').jsonToXmlObj;

var script = {
  "description": "description",
  "downloadURL": "https://example.com/example.user.js",
  "enabled": true,
  "filename": "examplescript@httpsexample.com.user.js",
  "grant": {
    "GM_addStyle": true,
    "unsafeWindow": true
  },
  "homepageURL": "https://example.com/",
  "includes": [],
  "matches": [
    "http://example.com/*",
    "http://example.org/*"
  ],
  "name": "examplescript",
  "namespace": "https://example.com/",
  "updateURL": "https://example.com/example.user.js",
  "version": "0.0.1"
};

var xmlObj = [
  { _attr: 
    { description: 'description',
      installurl: 'https://example.com/example.user.js',
      enabled: true,
      filename: 'examplescript@httpsexample.com.user.js',
      homepageURL: 'https://example.com/',
      name: 'examplescript',
      namespace: 'https://example.com/',
      updateurl: 'https://example.com/example.user.js',
      version: '0.0.1' } },
  { Grant: 'GM_addStyle' },
  { Grant: 'unsafeWindow' },
  { Match: 'http://example.com/*' },
  { Match: 'http://example.org/*' }
];

assert.deepEqual(jsonToXmlObj(script), xmlObj);
