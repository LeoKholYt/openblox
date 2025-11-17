const esbuild = require('esbuild');
const { globby } = require('globby');
const { rm } = require('node:fs/promises');

(async () => {
  const isWatch = process.argv.includes('--watch');

  if (!isWatch) {
    await rm('dist', { recursive: true, force: true });
  }
  const entryPoints = await globby(['src/**/*.{js,ts}']);

  const settings = {
    entryPoints,
    outdir: 'dist',
    //minify: true,
    //keepNames: true,
    format: 'cjs',
    platform: 'node',
    target: ['node18', 'node16', 'node20', 'node22']
  };

  if (isWatch) {
    console.log('Starting watch mode...');
    const ctx = await esbuild.context(settings);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(settings);
    console.log('Build completed');
  }
})();
