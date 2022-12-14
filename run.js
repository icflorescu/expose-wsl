#!/usr/bin/env node
import figlet from 'figlet';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import delay from './utils/delay.js';
import download from './utils/download.js';

const folder = `${tmpdir()}/expose-wsl`;

console.log(figlet.textSync('expose-wsl'), '\n');
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
  await delay(100);
  console.log('done.');
}
process.stdout.write('Patching WSL... ');
execSync(`${folder}/WSLHostPatcher.exe`);
console.log('done.');
process.stdout.write('WSL should be accessible at: ');
execSync(
  "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
  { stdio: 'inherit' }
);
process.exit(0);
