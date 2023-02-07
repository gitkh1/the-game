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

import cors from "cors";
import dotenv from "dotenv";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";
dotenv.config();

import express from "express";

import { createClientAndConnect } from "./db";

const isDev = () => process.env.NODE_ENV === "development";

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve("client/dist/index.html"));
  const srcPath = path.dirname(require.resolve("client"));
  const ssrClientPath = require.resolve("client/dist-ssr/client.cjs");

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: "custom",
    });

    app.use(vite.middlewares);
  }

  createClientAndConnect();

  app.get("/api", (_, res) => {
    res.json("👋 Howdy from the server :)");
  });

  if (!isDev()) {
    app.use("assets", express.static(path.resolve(distPath, "assets")));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl as string;
    try {
      let template: string;

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
      } else {
        template = fs.readFileSync(path.resolve(srcPath, "index.html"), "utf-8");
        template = await vite!.transformIndexHtml(url, template);
      }

      let render: (path: string) => Promise<string[]>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, "ssr.tsx") as string)).render;
      }

      const [appHtml, css] = await render(url);
      let html = template.toString().replace(`<!--ssr-outlet-->`, appHtml);
      html = html.replace(`<!--css-outlet-->`, css);

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
