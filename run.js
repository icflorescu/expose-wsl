#!/usr/bin/env node
import figlet from 'figlet';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import delay from './utils/delay.js';
import download from './utils/download.js';

const folder = dirname(fileURLToPath(import.meta.url));

console.log(figlet.textSync('expose-wsl'), '\n');

if (!existsSync(`${folder}/WSLHostPatcher.exe`)) {
  process.stdout.write('⏳ WSLHostPatcher not found, downloading... ');
  await download(
    'https://github.com/CzBiX/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip',
    `${folder}/WSLHostPatcher.zip`
  );
  process.stdout.write('extracting... ');
  execSync(`unzip ${folder}/WSLHostPatcher.zip -d ${folder}`);
  execSync(`rm ${folder}/WSLHostPatcher.zip`);
  execSync(`chmod +x ${folder}/WSLHostPatcher.exe`);
  await delay(100);
  console.log('done ✔️');
}
process.stdout.write('⏳ Patching WSL... ');
execSync(`${folder}/WSLHostPatcher.exe`);
console.log('done ✔️');
console.log('💡 Make sure to restart your server application(s) before trying to access them!\n');
process.stdout.write('🎉 WSL should be accessible at: ');
execSync(
  "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
  { stdio: 'inherit' }
);
process.exit(0);
