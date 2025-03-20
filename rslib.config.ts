import {defineConfig} from '@rslib/core';

export default defineConfig({
    source: {
        entry: {
            index: "./src/libs/index.ts"
        }
    },
    lib: [
        {
            format: 'esm',
            syntax: 'es2021',
            dts: true,
        },
        {
            dts: true,
            format: 'cjs',
            syntax: 'es2021',
        },
    ],
});
