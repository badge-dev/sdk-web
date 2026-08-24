import {resolve} from "node:path";
import {defineConfig} from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [dtsPlugin({include: ["src"], bundleTypes: true})],
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "badge",
      fileName: "index",
    },
  },
});
