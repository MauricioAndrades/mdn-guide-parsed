# MDN-GUIDE Parse

Cause I'm tired of constantly switching windows...

This project will be full complete parse of the mdn guide to JSON. With streaming autocomplete and ALL properties on the MDN HTML, JS, CSS guides.

Example Objs can be seen in `./guides`.

Currently implementing promise/request code to comletely fill out the objs
with all properties... including `examples`, `notes`, `syntax` etc...

## Example

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
