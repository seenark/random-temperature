Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "./dist",
  target: "bun",
  format: "esm",
  minify: {
    whitespace: true,
    identifiers: true,
    syntax: true
  },
  sourcemap: "external",
  drop: ["console"],
})
