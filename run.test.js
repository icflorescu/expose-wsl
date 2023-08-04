import extract from 'extract-zip';
import { chmodSync, existsSync, statSync, unlinkSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, expect, it } from 'vitest';
import download from './utils/download.js';

const dir = dirname(fileURLToPath(import.meta.url));

it('should download and extract the patcher', async () => {
  await download(
    'https://github.com/CzBiX/WSLHostPatcher/releases/latest/download/WSLHostPatcher.zip',
    `${dir}/WSLHostPatcher.zip`
  );
  await extract(`${dir}/WSLHostPatcher.zip`, { dir });
  chmodSync(`${dir}/WSLHostPatcher.exe`, 0o755);
  expect(existsSync(`${dir}/WSLHostPatch.dll`)).toBe(true);
  expect(existsSync(`${dir}/WSLHostPatcher.exe`)).toBe(true);
  expect(statSync(`${dir}/WSLHostPatcher.exe`).mode).toBe(0o0100755);
});

afterAll(() => {
  unlinkSync(`${dir}/WSLHostPatcher.zip`);
  unlinkSync(`${dir}/WSLHostPatch.dll`);
  unlinkSync(`${dir}/WSLHostPatcher.exe`);
});
