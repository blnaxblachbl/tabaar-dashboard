import {
  defineConfig,
  loadEnv,
  type CommonServerOptions,
  type ProxyOptions,
} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const proxy: Record<string, ProxyOptions | string> = {
    "/graphql": env.GRAPHQL_API_ENDPOINT,
    "/api": {
      target: env.REST_API_ENDPOINT,
      rewrite: (path) => {
        return path.replace(/^\/api/, "");
      },
    },
  };
  const port = Number(env.PORT ?? 3000);
  const server: CommonServerOptions = {
    port,
    proxy,
    host: true,
    cors: true,
    allowedHosts: true,
  };

  return {
    plugins: [react(), tailwindcss(), svgr()],
    server,
    preview: server,
    resolve: {
      tsconfigPaths: true,
    },
  };
});
