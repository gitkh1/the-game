// ../client/vite.config.ts
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYmlydGFub3ZcXFxceWFuZGV4X3ByYWt0aWN1bVxcXFx0aGUtZ2FtZVxcXFxwYWNrYWdlc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGJpcnRhbm92XFxcXHlhbmRleF9wcmFrdGljdW1cXFxcdGhlLWdhbWVcXFxccGFja2FnZXNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9iaXJ0YW5vdi95YW5kZXhfcHJha3RpY3VtL3RoZS1nYW1lL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiOy8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgKi9cbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmRvdGVudi5jb25maWcoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LkNMSUVOVF9QT1JUKSB8fCAzMDAwLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX1NFUlZFUl9QT1JUX186IHByb2Nlc3MuZW52LlNFUlZFUl9QT1JUIHx8IDMwMDEsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHQSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sT0FBTztBQUdkLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM5QztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==