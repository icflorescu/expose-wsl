import { createWriteStream, unlink } from 'node:fs';
import { get } from 'node:https';

/**
 * @param {string} from
 * @param {string} to
 * @returns {Promise<void>}
 */
export default function download(from, to) {
  return new Promise((resolve, reject) => {
    const onError = function (e) {
      unlink(to);
      reject(e);
    };
    get(from, function (response) {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const fileStream = createWriteStream(to);
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
