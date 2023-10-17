import { Command } from "@commander-js/extra-typings";
// eslint-disable-next-line import/no-named-as-default
import OpenAI from "openai";

import { IssueCommand } from "./commands/issue";
import type { AbastCommand } from "./commands/AbastCommand.ts";
import { Config } from "./config/config.ts";
import { version } from "../package.json";
import { ConfigCommand } from "./commands/config";
import { Logger } from "./logger.ts";
import type { ConfigValues } from "./config/schema.ts";

const logger = new Logger();

export class Abast {
	public openAI: OpenAI;
	public config: ConfigValues;

	constructor(
		public configInstance: Config,
		public logger: Logger,
	) {
		this.config = configInstance.values;
		this.openAI = new OpenAI({
			apiKey: this.config.openai?.key || "",
		});
	}

	commands(): AbastCommand[] {
		return [new IssueCommand(this), new ConfigCommand(this)];
	}

	async main() {
		const program = new Command();

		program.name("abast").description("Automation of Boring And Slow Tasks").version(version.trim());

		for (const command of this.commands()) {
			await command.registerToProgram(program);
		}

		await program.parseAsync();
	}
}

const config = await Config.load(logger);
await new Abast(config, logger).main();
