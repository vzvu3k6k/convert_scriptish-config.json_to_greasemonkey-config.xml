# Convert scriptish-config.json to Greasemonkey's config.xml

To migrate from Scriptish to Greasemonkey, it is not enough to copy userscript files from `scriptish_scripts` to `gm_scripts`. Greasemonkey requires that `gm_scripts/config.xml` have metadata of each userscript. This script parses `scripts_directory/scriptish-config.json` (Scriptish counterpart to `config.xml`) and prints Greasemonkey's `config.xml`.

*NOTE*: This script converts just enough attributes for Greasemonkey to recognize userscripts.

## Requirements

- node

## Usage

```
$ npm install
$ node index.js scriptish-config.json > config.xml
```

## References

- [How To: Manually transfer user scripts from Greasemonkey to Scriptish · scriptish/scriptish Wiki · GitHub](https://github.com/scriptish/scriptish/wiki/How-To:--Manually-transfer-user-scripts-from-Greasemonkey-to-Scriptish)
- [Importing Scriptish userscripts? · Issue #1648 · greasemonkey/greasemonkey · GitHub](https://github.com/greasemonkey/greasemonkey/issues/1648)
