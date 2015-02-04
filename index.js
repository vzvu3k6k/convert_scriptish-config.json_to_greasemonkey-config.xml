var xml = require('xml');
var JSONStream = require('JSONStream');
var reduce = require('stream-reduce');
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

// Converts scripts.* into XML object
var jsonToXmlObj = function(json){
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

    // {GM_addStyle: true} -> ['GM_addStyle']
    if(key === 'grant'){
      json[key] = Object.keys(json[key]);
    }

    if(!(json[key] instanceof Array)){
      json[key] = [json[key]];
    }
    json[key].forEach(function(v){
      var node = {};
      node[childTags[key]] = v;
      xmlNodes.push(node);
    });
  });

  return xmlNodes;
};

if(__filename === process.argv[1]){
  fs.createReadStream(process.argv[2])
    .pipe(JSONStream.parse('scripts.*'))
    .pipe(reduce(function(result, json){
      return result.concat({
        Script: jsonToXmlObj(json)
      });
    }, []))
    .on('data', function(xmlObj){
      console.log(xml({UserScriptConfig: xmlObj}));
    });
}else{
  exports.jsonToXmlObj = jsonToXmlObj;
}
