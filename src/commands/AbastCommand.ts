import type { Command } from "@commander-js/extra-typings";

import type { Abast } from "../index.ts";

export abstract class AbastCommand {
	abstract name: string;

	constructor(protected abast: Abast) {}

	abstract register(command: Command): Promise<void>;

	async registerToProgram(program: Command) {
		return this.register(program.command(this.name));
	}
}
