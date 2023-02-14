/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from "fs";
import https from "https";
import path from "path";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";

import devHosts from "./hosts/hosts.json";
import { createClientAndConnect } from "./db";
import { findIP, makeStartLogsText } from "./utils";

dotenv.config();
const isDev = () => process.env.NODE_ENV === "development";
const APP_HOSTS = ["localhost"];

if (isDev()) {
  const devLocalIP = findIP();
  if (devLocalIP) {
    APP_HOSTS.push(devLocalIP);
  }
}

const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve("client/dist/index.html"));
  const srcPath = path.dirname(require.resolve("client"));
  const ssrClientPath = require.resolve("client/dist-ssr/ssr.cjs");

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
    app.get("*/assets/*", express.static(distPath));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl as string;
    try {
      let template: string;

      if (isDev()) {
        template = fs.readFileSync(path.resolve(srcPath, "index.html"), "utf-8");
        template = await vite!.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
      }

      let render: (path: string) => Promise<string[]>;

      if (isDev()) {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, "ssr.tsx") as string)).render;
      } else {
        render = (await import(ssrClientPath)).render;
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

  if (isDev()) {
    const certificate = fs.readFileSync(path.resolve("certificate", "certificate.pem"), "utf8");
    const key = fs.readFileSync(path.resolve("certificate", "key.pem"), "utf8");

    https.createServer({ key: key, cert: certificate }, app).listen(port, "0.0.0.0", () => {
      console.info(makeStartLogsText(APP_HOSTS.concat(...devHosts.map(({ host }) => host)), "https", port));
    });
  } else {
    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  }
};

startServer();
