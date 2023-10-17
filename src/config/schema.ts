import type { ZodRawShape } from "zod";
import { z } from "zod";

const zs = (shape: ZodRawShape) => z.object(shape).strict().optional();

export const configSchema = z
	.object({
		openai: zs({
			key: z.string(),
		}),
		gitlab: zs({
			host: z.string().default("https://gitlab.com"),
			token: z.string(),
		}),
		issue: zs({
			template: z.string().default(""),
		}),
	})
	.strict();

export type ConfigValues = z.infer<typeof configSchema>;
export const defaults = configSchema.parse({});
