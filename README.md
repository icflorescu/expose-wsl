# Expose-WSL

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]

The simplest way to expose your WSL to the local network.

## Usage

Simply run the following command in your WSL terminal:

```bash
npx expose-wsl
```

## Why?

WSL provides a great environment for web developers working on Windows.  
However, it's not always easy to access the applications running in WSL from the local network.  
This tool is probably the easiest way to expose your WSL to the local network.

## How?

This tool uses the excellent [WSLHostPatcher](https://github.com/CzBiX/WSLHostPatcher) built by [CzBiX](https://github.com/CzBiX).  
It automates the process of downloading the WSLHostPatcher release and applying it to your WSL.

## Requirements

This tool should work on any Windows 10 machine running WSL with Node.js `>=14.8.0` installed.

## License

The [ISC License](LICENSE).

[npm-image]: https://img.shields.io/npm/v/expose-wsl.svg?style=flat-square
[npm-url]: https://npmjs.org/package/expose-wsl
[license-image]: http://img.shields.io/npm/l/expose-wsl.svg?style=flat-square
[license-url]: LICENSE
