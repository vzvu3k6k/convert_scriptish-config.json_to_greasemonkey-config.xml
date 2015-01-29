var xml = require('xml');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var fs = require('fs');

// Lists keys that are converted an XML element
// and its tag name (key name is key, tag_name is value)
var childTags = {
  grant: 'Grant',
  includes: 'Include',
  matches: 'Match',
};

// Some attribute names need to be converted.
var attrTable = {
  downloadURL: 'installurl',
  updateURL: 'updateurl',
};

var scriptNodes = [];

fs.createReadStream(process.argv[2])
  .pipe(JSONStream.parse('scripts.*'))
  .pipe(es.mapSync(function(json){
    var xmlAttrs = [];
    var xmlNodes = [{_attr: xmlAttrs}];

    Object.keys(json).forEach(function(key){
      if(Object.keys(childTags).indexOf(key) === -1){
        if(json[key] !== null && json[key] !== false
           && json[key].length !== 0){
          xmlAttrs[attrTable[key] || key] = json[key];
        }
        return;
      }

      // {'GM_addStyle': true} -> ['GM_addStyle']
      if(key === 'grant'){
        json[key] = Object.keys(json[key]);
      }

      if(json[key] instanceof Array){
        json[key].forEach(function(v){
          var node = {};
          node[childTags[key]] = v;
          xmlNodes.push(node);
        });
      }else{
        var node = {};
        node[childTags[key]] = json[key];
        xmlNodes.push(node);
      }
    });

    scriptNodes.push({
      Script: xmlNodes
    });
  }))
  .on('end', function(){
    console.log(xml({UserScriptConfig: scriptNodes}));
  });
