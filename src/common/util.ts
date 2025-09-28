import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec); // 将 exec 转换为返回 Promise 的函数

export async function runCommand(cmd:string, cwd:string) {
  try {
    const stdout = await execAsync(cmd, {
      cwd,
      encoding: 'utf-8',
    });
    // 返回 audit 的 JSON 结果
    return stdout.stdout.toString();
  } catch (err:any) {
    if (err.stdout) {
      return err.stdout.toString();
    }
    throw err;
  }
}

export function uniqueId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function getFilename(importMetaUrl:string) {
  return fileURLToPath(importMetaUrl);
}

export function getDirname(importMetaUrl:string) {
  return dirname(getFilename(importMetaUrl));
}
