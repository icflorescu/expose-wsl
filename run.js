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

// Cleanup leftovers from previous runs, if any
if (existsSync(`${dir}/WSLHostPatcher.zip`)) unlinkSync(`${dir}/WSLHostPatcher.zip`);
if (existsSync(`${dir}/WSLHostPatch.dll`)) unlinkSync(`${dir}/WSLHostPatch.dll`);
if (existsSync(`${dir}/WSLHostPatcher.exe`)) unlinkSync(`${dir}/WSLHostPatcher.exe`);

let success = false;
try {
  process.stdout.write('⏳ Downloading WSLHostPatcher... ');
  await download(
    'https://github.com/CzBiX/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip',
    `${dir}/WSLHostPatcher.zip`
  );
  process.stdout.write('extracting... ');
  await extract(`${dir}/WSLHostPatcher.zip`, { dir });

  // Remove the zip file
  unlinkSync(`${dir}/WSLHostPatcher.zip`);

  // Make sure the patcher is executable
  chmodSync(`${dir}/WSLHostPatcher.exe`, 0o755);

  // Wait a bit to make sure the patcher is ready, then run it
  await delay(100);
  process.stdout.write('running... ');
  execSync(`${dir}/WSLHostPatcher.exe`);

  console.log('done ✔️');
  process.stdout.write('🎉 WSL should be accessible at: ');
  execSync(
    "powershell.exe 'Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $(Get-NetConnectionProfile | Select-Object -ExpandProperty InterfaceIndex) | Select-Object -ExpandProperty IPAddress'",
    { stdio: 'inherit' }
  );
  console.log('💡 Make sure to restart your server application(s) before trying to access them!');
  success = true;
} catch (err) {
  console.log('failed to run ❌');
  console.log('🔥 Please report this issue at https://github.com/icflorescu/expose-wsl/issues');
  console.log(err.stderr ? err.stderr.toString() : err);
} finally {
  // Remove the patcher files
  unlinkSync(`${dir}/WSLHostPatcher.exe`);
  unlinkSync(`${dir}/WSLHostPatch.dll`);
}

process.exit(success ? 0 : 1);
