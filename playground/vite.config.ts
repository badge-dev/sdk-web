import {resolve} from "node:path";
import {defineConfig} from "vite";

export default defineConfig({
  resolve: {alias: {"@badge-sdk/web": resolve(import.meta.dirname, "../src")}},
});
