import * as esbuild from 'esbuild';
import pkg from 'esbuild-plugin-external-global';
const {externalGlobalPlugin} = pkg;

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    globalName: 'Roz',
    outfile: 'dist/roz-form.min.js',
    plugins: [
        externalGlobalPlugin({
            'react': 'window.React'
        })
    ]
});