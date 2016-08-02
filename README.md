# mdn-guide to JSON.

Converting the firefox/mdn guide to JSON for quick reference. On going will update entries as I encouter new ones. 
JSON objects are in `./guides/`


Currently implementing promise/request code to comletely fill out the objs
with all properties... including `examples`, `notes`, `syntax` etc...

## Guides Example Entry

```json
{
  "name": "Node.baseURI",
  "desc": "The Node.baseURI read-only property returns the absolute base URL of a node.",
  "href": "https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI",
  "type": "Property",
  "syntax": "uriObj = node.baseURIObject",
  "notes": "This property is read-only; attempting to write to it will throw an exception. In addition, this property may only be accessed from privileged code."
},
```
