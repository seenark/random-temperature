Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "./dist",
  target: "bun",
  format: "cjs",
  minify: {
    whitespace: true,
    identifiers: true,
    syntax: true
  },
  sourcemap: "external",
  drop: ["console"],
  bytecode: true,
})
