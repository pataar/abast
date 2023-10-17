import { Command } from "@commander-js/extra-typings";

import { AbastCommand } from "../AbastCommand.ts";
import { Config } from "../../config.ts";

export class ConfigCommand extends AbastCommand {
	name = "config";

	async register(command: Command): Promise<void> {
		command
			.description("configure abast")
			.addCommand(
				new Command("set")
					.argument("<key>")
					.argument("<value>")
					.action(async (key, value) => {
						const keys = key.split(".");
						const lastKey = keys.pop() || "";
						const newValues = keys.reduceRight((acc: Record<string, unknown>, key) => ({ [key]: acc }), {
							[lastKey]: value,
						});
						await this.abast.configInstance.set(newValues);
						this.abast.logger.info(`Set ${key} to ${value}`);
					}),
			)
			.addCommand(
				new Command("file").action(async () => {
					this.abast.logger.info(await Config.file());
				}),
			);
	}
}
