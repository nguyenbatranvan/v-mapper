import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
	test: {
		include: ["tests/**/*.test.ts"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
