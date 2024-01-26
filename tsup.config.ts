import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/**/*.ts",
    "src/**/*.sql",
    "!src/**/*.test.*",
    "!src/**/*mocks.*",
  ],
  target: "esnext",
  format: "esm",
  platform: "node",
  bundle: false,
  dts: true,
  splitting: false,
  clean: true,
  loader: {
    ".sql": "copy",
  },
});
