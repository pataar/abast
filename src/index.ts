import { Command } from "@commander-js/extra-typings";
// eslint-disable-next-line import/no-named-as-default
import OpenAI from "openai";
import type { Logger } from "pino";
import { pino } from "pino";

import { IssueCommand } from "./commands/issue";
import type { AbastCommand } from "./commands/AbastCommand.ts";
import type { ConfigValues } from "./config.ts";
import { Config } from "./config.ts";
import version from "../version.txt";
import { ConfigCommand } from "./commands/config";

const logger = pino({
	transport: {
		targets: [
			{
				target: "pino-pretty",
				level: "info",
				options: {
					colorize: process.stdout.isTTY,
					ignore: process.stdout.isTTY ? "pid,hostname" : "pid,hostname,level,time",
				},
			},
		],
	},
});

export class Abast {
	public openAI: OpenAI;
	public config: ConfigValues;

	constructor(
		public configInstance: Config,
		public logger: Logger,
	) {
		this.config = configInstance.values;
		this.openAI = new OpenAI({
			apiKey: this.config.openai.key,
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
