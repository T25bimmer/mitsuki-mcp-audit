import fs from 'fs';
import { join, dirname } from 'path';
import { runCommand } from '../common/util';

// 写入 package.json
async function writePackageJson(workDir:string, packageJson:Object) {
  const packageJsonPath = join(workDir, 'package.json');
  fs.mkdirSync(dirname(packageJsonPath), { recursive: true });
  await fs.promises.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson),
    'utf8'
  );
}

// 创建 lock 文件
async function createLockFile(workDir:string) {
  const cmd = `npm install --package-lock-only --force`;
  await runCommand(cmd, workDir); // 在工作目录中执行命令
}

export async function generateLock(workDir:string, packageJson:Object) {
  // 1. 将 package.json 写入工作目录
  await writePackageJson(workDir, packageJson);
  // 2. 生成 lock 文件
  await createLockFile(workDir);
}
