import path from "path";
import { homedir } from "os";

import merge from "lodash.merge";
import { z } from "zod";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import json2toml from "json2toml";
import { ensureDir } from "fs-extra";

import type { Logger } from "./logger.ts";

export const configSchema = z.object({
	openai: z
		.object({
			key: z.string().default(""),
		})
		.default({}),
});

export type ConfigValues = z.infer<typeof configSchema>;

export class Config {
	public static fileLocations = [`${homedir()}/.config/abast/abast.toml`];

	constructor(public values: ConfigValues) {}

	async write() {
		await ensureDir(path.dirname(Config.fileLocations[0]));
		return Bun.write(path.resolve(Config.fileLocations[0]), json2toml(this.values));
	}

	static async file() {
		for (const fileLocation of Config.fileLocations) {
			if (await Bun.file(fileLocation).exists()) {
				return fileLocation;
			}
		}
	}

	static async load(logger: Logger) {
		const configFile = await Config.file();

		if (configFile) {
			const config = await import(configFile);

			const parsedConfig = await configSchema.safeParseAsync(config);

			if (!parsedConfig.success) {
				logger.error(`Failed to parse config: ${parsedConfig.error}`);
				process.exit(1);
			}

			logger.debug({ config: parsedConfig.data }, "Loaded config");

			return new Config(parsedConfig.data);
		}

		const configInstance = new Config(configSchema.parse({}));
		await configInstance.write();

		return configInstance;
	}

	set(newValues: Partial<ConfigValues>) {
		this.values = configSchema.parse(merge(this.values, newValues));
		return this.write();
	}
}
