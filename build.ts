import * as esbuild from 'esbuild';
import { globby } from 'globby';
import { rm } from "node:fs/promises";

const isWatch = process.argv.includes('--watch');

if (!isWatch) {
  await rm('dist', { recursive: true, force: true })
}
const entryPoints = await globby(['src/**/*.{js,ts}']);

const settings = {
  entryPoints,
  outdir: "dist",
  //minify: true,
  //keepNames: true,
  format: 'cjs',
  platform: 'node',
  target: ['node18', 'node16', 'node20', 'node22']
} satisfies esbuild.BuildOptions

if (isWatch) {
  console.log('Starting watch mode...');
  const ctx = await esbuild.context(settings);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(settings);
  console.log('Build completed');
}
