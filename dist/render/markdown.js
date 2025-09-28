import ejs from 'ejs';
import { join } from 'path';
import { getDirname } from '../common/util.js';

const templatePath = join(getDirname(import.meta.url), './template/index.ejs');
function renderMarkdown(data) {
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

export { renderMarkdown };
