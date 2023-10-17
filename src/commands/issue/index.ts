import type { Command } from "@commander-js/extra-typings";

import { AbastCommand } from "../AbastCommand.ts";

export class IssueCommand extends AbastCommand {
	name = "issue";

	async register(command: Command): Promise<void> {
		command.description("issue thingy").action(async () => {
			const stream = await this.abast.openAI.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: "Hallo wie ben jij?" }],
				stream: true,
			});
			for await (const part of stream) {
				process.stdout.write(part.choices[0]?.delta?.content || "");
			}
		});
	}
}
