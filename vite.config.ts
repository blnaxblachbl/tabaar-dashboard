import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), svgr()],
    server: {
      port: 3000,
      proxy: {
        "/graphql": env.GRAPHQL_API_ENDPOINT,
        "/api": env.REST_API_ENDPOINT,
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
  };
});
