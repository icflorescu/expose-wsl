#!/usr/bin/env node
import extract from 'extract-zip';
import figlet from 'figlet';
import { execSync } from 'node:child_process';
import { chmodSync, existsSync, unlinkSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import delay from './utils/delay.js';
import download from './utils/download.js';

const dir = dirname(fileURLToPath(import.meta.url));

console.log(figlet.textSync('expose-wsl'), '\n');

if (!existsSync(`${dir}/WSLHostPatcher.exe`)) {
  process.stdout.write('⏳ WSLHostPatcher not found, downloading... ');
  await download(
    'https://github.com/CzBiX/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip',
    `${dir}/WSLHostPatcher.zip`
  );
  process.stdout.write('extracting... ');
  await extract(`${dir}/WSLHostPatcher.zip`, { dir });
  unlinkSync(`${dir}/WSLHostPatcher.zip`);
  chmodSync(`${dir}/WSLHostPatcher.exe`, 0o755);
  await delay(100); // wait a bit...
  console.log('done ✔️');
}
process.stdout.write('⏳ Patching WSL... ');
execSync(`${dir}/WSLHostPatcher.exe`);
console.log('done ✔️');
console.log('💡 Make sure to restart your server application(s) before trying to access them!\n');
process.stdout.write('🎉 WSL should be accessible at: ');
execSync(
  "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
  { stdio: 'inherit' }
);
process.exit(0);
