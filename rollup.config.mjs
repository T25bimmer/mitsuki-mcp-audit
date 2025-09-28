import { glob } from 'glob';
import typescript from '@rollup/plugin-typescript';

const files = await glob('src/**/*.ts');

export default {
    input: files,
    output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            declaration: false,
            declarationMap: false
        })
    ],
};

