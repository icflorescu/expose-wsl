# Expose-WSL

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][npm-url]
[![Language][language-image]][repo-url]


> Probably the simplest way to expose apps running on WSL to local network devices.

![expose-wsl](https://user-images.githubusercontent.com/581999/207399663-b72d4fff-4761-45cb-942b-e9cbff4871e4.png)

## TL;DR

No installation required. Simply run the following command in your WSL terminal **before starting your applications**:

```bash
npx expose-wsl@latest
```

## Why?

WSL provides a great environment for web developers working on Windows.  
However, it's not always easy to access the applications running in WSL from the local network.  
Whether you're working on a web app, a React-Native application, REST API, or have a database residing in a Docker container, you'll need to access it from a real mobile phone or simply from a different device.  
While there are ways to achieve this, they are not always easy to implement.  
Some of them require tackling with an [NIC Bridge mode](https://github.com/microsoft/WSL/issues/4150#issuecomment-1018524753) or manually downloading and applying a [WSLHostPatcher](https://github.com/CzBiX/WSLHostPatcher).  
Which are things you probably don't want to deal with when you're just trying to get your work done.  
Here's where **Expose-WSL** comes into play.

## How?

This tool uses the excellent [WSLHostPatcher](https://github.com/CzBiX/WSLHostPatcher) built by [CzBiX](https://github.com/CzBiX).  
It automates the process of downloading the **WSLHostPatcher** release, decompressing the binary, running it to patch your WSL, and running a PowerShell script to display the IP address of your machine.

## Requirements

**Expose-WSL** should work on any Windows machine running WSL with Node.js `>=14.8.0` installed.

## Caveats

Please understand that this tool is not a replacement for a proper network configuration.  
It patches your WSL machine to expose it to the local network, which is not advisable for production environments.  
I canot imagine a healthy reason to use and expose WSL in production, but if you do, please make sure you know what you're doing.

## Contributing

Feel free to open an issue if you have any suggestions or found a bug.  
Coming up with a PR would be a lot better, though.  
Writing and maintaining open-source software is a lot of work and requires time and energy, so I'd appreciate it if you could help with solutions instead of just pointing out problems.

## Supporting

If you find this tool useful, please consider sponsoring my work on [GitHub Sponsors](https://github.com/sponsors/icflorescu).  
I'm the author and maintainer of [several open-source projects](https://github.com/icflorescu), and your support will help me keep them up-to-date and bug-free.
I might also be available for hire. If you need help with your project, feel free to contact me at the email address listed on my GitHub profile.

## Credits

[CzBiX](https://github.com/CzBiX) for creating [WSLHostPatcher](https://github.com/CzBiX/WSLHostPatcher).

## License

The [ISC License](https://github.com/icflorescu/expose-wsl/blob/master/LICENSE).

[npm-image]: https://img.shields.io/npm/v/expose-wsl.svg?style=flat-square
[license-image]: http://img.shields.io/npm/l/expose-wsl.svg?style=flat-square
[downloads-image]: http://img.shields.io/npm/dm/expose-wsl.svg?style=flat-square
[language-image]: https://img.shields.io/github/languages/top/icflorescu/expose-wsl?style=flat-square
[npm-url]: https://npmjs.org/package/expose-wsl
[repo-url]: https://github.com/icflorescu/expose-wsl
[license-url]: LICENSE
