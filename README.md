# [setheaders](http://supergiovane.tk/#/setheaders)

[![NPM version](https://img.shields.io/npm/v/setheaders.svg)](https://www.npmjs.com/package/setheaders)
[![Linux Status](https://img.shields.io/travis/hex7c0/setheaders.svg?label=linux)](https://travis-ci.org/hex7c0/setheaders)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/setheaders.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/setheaders)
[![Dependency Status](https://img.shields.io/david/hex7c0/setheaders.svg)](https://david-dm.org/hex7c0/setheaders)

boilerplate for res.setHeader, protection from being overridden

## Installation

Install through NPM

```bash
npm install setheaders
```
or
```bash
git clone git://github.com/hex7c0/setheaders.git
```

## API

inside nodejs project
```js
var setHeader = require('setheaders');

setHeader(res,'X-Foo','pippo');
```

### setheaders(res,name,value,[protected],[override])

#### options

 - `res` - **Object** response to client *(default "required")*
 - `name`- **String** header's name *(default "required")*
 - `value` - **String** header's value *(default "required")*
 - `protected` - **Boolean** set protected header, from being overridden before they are written to response *(default "disabled")*
 - `override` - **Boolean** check if I'm trying to override a header *(default "disabled")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
