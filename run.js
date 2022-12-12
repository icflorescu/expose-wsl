#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync, unlink } from 'node:fs';
import { get } from 'node:https';
import { tmpdir } from 'node:os';

/**
 * @param {string} from
 * @param {string} to
 * @returns {Promise<void>}
 */
function download(from, to) {
  return new Promise((resolve, reject) => {
    var onError = function (e) {
      unlink(to);
      reject(e);
    };
    get(from, function (response) {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        var fileStream = createWriteStream(to);
        fileStream.on('error', onError);
        fileStream.on('close', resolve);
        response.pipe(fileStream);
      } else if (response.headers.location) {
        resolve(download(response.headers.location, to));
      } else {
        reject(new Error(response.statusCode + ' ' + response.statusMessage));
      }
    }).on('error', onError);
  });
}

const folder = `${tmpdir()}/expose-wsl`;

if (!existsSync(folder)) {
  process.stdout.write('WSLHostPatcher not found, downloading... ');
  mkdirSync(folder);
  await download(
    'https://github.com/CzBiX/WSLHostPatcher/releases/download/v0.1.1/WSLHostPatcher.zip',
    `${folder}/WSLHostPatcher.zip`
  );
  process.stdout.write('extracting files... ');
  execSync(`unzip ${folder}/WSLHostPatcher.zip -d ${folder}`);
  execSync(`rm ${folder}/WSLHostPatcher.zip`);
  execSync(`chmod +x ${folder}/WSLHostPatcher.exe`);
  console.log('done.');
}
process.stdout.write('Patching WSL... ');
execSync(`${folder}/WSLHostPatcher.exe`);
console.log('done.');
process.stdout.write('WSL should be exposed at: ');
execSync(
  "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
  { stdio: 'inherit' }
);
process.exit(0);
