/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import path from "path";

import { T_CreateStore, T_Store } from "client/src/global/store";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer as createViteServer, ViteDevServer } from "vite";

import { createClientAndConnect } from "./db";

dotenv.config();

const isDev = () => process.env.NODE_ENV === "development";

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;

  const clientPath = path.dirname(require.resolve("client"));
  const csrPath = path.dirname(require.resolve("client/dist/client/index.html"));
  const ssrPath = require.resolve("client/dist/server/ssr.cjs");

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  createClientAndConnect();

  app.get("/api", (_, res) => {
    res.json("👋 Howdy from the server :)");
  });

  if (!isDev()) {
    app.get("*/assets/*", express.static(csrPath));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl as string;
    try {
      let template: string;

      if (isDev()) {
        template = fs.readFileSync(path.resolve(clientPath, "index.html"), "utf-8");
        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(csrPath, "index.html"), "utf-8");
      }

      let render: (path: string, store: T_Store) => Promise<string[]>;
      let createStore: T_CreateStore;

      if (isDev()) {
        render = (await vite!.ssrLoadModule(path.resolve(clientPath, "src/main-server.tsx") as string)).render;
        createStore = (await vite!.ssrLoadModule(path.resolve(clientPath, "src/main-server.tsx") as string)).createStore;
      } else {
        render = (await import(ssrPath)).render;
        createStore = (await import(ssrPath)).createStore;
      }

      const store = createStore();

      const [appHtml, css] = await render(url, store);

      let html = template.toString().replace(`<!--ssr-outlet-->`, appHtml);
      html = html.replace(`<!--css-outlet-->`, css);
      html = html.replace(`<!--store-outlet-->`, `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
