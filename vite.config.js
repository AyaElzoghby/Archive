import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	// server: {
	// 	// port: 8514,
	// 	// https: {
	// 	// 	key: fs.readFileSync("./private-key.pem"), // path to your private key
	// 	// 	cert: fs.readFileSync("./cert.pem"), // path to your certificate
	// 	// },
	// 	// host: "0.0.0.0",
	// },
});
