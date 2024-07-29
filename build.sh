# IIFE
node build-browser.mjs
# CJS
npx esbuild src/index.js --bundle --sourcemap --format=cjs --packages=external --outfile=dist/easy-form-cjs.js
# ESM
npx esbuild src/index.js --bundle --sourcemap --format=esm --packages=external --outfile=dist/easy-form-esm.js
# Examples
npx esbuild examples/src/index.jsx --bundle --minify --sourcemap --format=iife --outfile=examples/dist/examples.min.js