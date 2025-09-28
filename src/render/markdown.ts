import ejs from 'ejs'
import { join } from 'path';
import { getDirname } from '../common/util';
import type { DataDesc } from '../@types';

const templatePath = join(getDirname(import.meta.url), './template/index.ejs');

export function renderMarkdown(data:DataDesc):Promise<string> {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    });
  });
}
