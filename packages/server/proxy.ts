import { createProxyMiddleware, Options } from "http-proxy-middleware";

const SWAGGER_TARGET: Options = {
  target: "https://ya-praktikum.tech",
  changeOrigin: true,
  pathRewrite: { "^/proxy": "/api/v2" },
  cookieDomainRewrite: "ya-praktikum.tech",
};

const GEO_TARGET: Options = {
  target: `https://geocode-maps.yandex.ru`,
  changeOrigin: true,
  pathRewrite: { "^/geo/?geocode=": "/1.x/?apikey=0b1ae83c-cabe-4a13-94d9-9910b90ef315&format=json&geocode=" },
  cookieDomainRewrite: "geocode-maps.yandex.ru",
};

export const swaggerProxy = createProxyMiddleware(SWAGGER_TARGET);
export const geoProxy = createProxyMiddleware(GEO_TARGET);
