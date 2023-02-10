/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig, UserConfigExport } from "vite";
dotenv.config();

const clientConfig: UserConfigExport = {
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  build: {
    outDir: "dist/client",
  },
};

const serverConfig: UserConfigExport = {
  build: {
    outDir: "dist/server",
    rollupOptions: {
      input: {
        ssr: "src/main-server.tsx",
      },
      output: {
        format: "cjs",
      },
    },
  },
};

export default defineConfig(({ ssrBuild }) => {
  return {
    plugins: [react()],
    ...(ssrBuild ? serverConfig : clientConfig),
  };
});
