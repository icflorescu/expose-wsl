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

// Ensure cleanup
if (existsSync(`${dir}/WSLHostPatcher.zip`)) unlinkSync(`${dir}/WSLHostPatcher.zip`);
if (existsSync(`${dir}/WSLHostPatch.dll`)) unlinkSync(`${dir}/WSLHostPatch.dll`);
if (existsSync(`${dir}/WSLHostPatcher.exe`)) unlinkSync(`${dir}/WSLHostPatcher.exe`);

process.stdout.write('⏳ Downloading WSLHostPatcher... ');
await download(
  'https://github.com/CzBiX/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip',
  `${dir}/WSLHostPatcher.zip`
);
process.stdout.write('extracting... ');
await extract(`${dir}/WSLHostPatcher.zip`, { dir });
unlinkSync(`${dir}/WSLHostPatcher.zip`);
chmodSync(`${dir}/WSLHostPatcher.exe`, 0o755);
await delay(100); // wait a bit...
process.stdout.write('running... ');
execSync(`${dir}/WSLHostPatcher.exe`);
unlinkSync(`${dir}/WSLHostPatcher.exe`);
unlinkSync(`${dir}/WSLHostPatch.dll`);
console.log('done ✔️');
console.log('💡 Make sure to restart your server application(s) before trying to access them!\n');
process.stdout.write('🎉 WSL should be accessible at: ');
execSync(
  "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
  { stdio: 'inherit' }
);
process.exit(0);
