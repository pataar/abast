const config = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},

	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	globals: {
		ENVIRONMENT: false,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "es2022",
		sourceType: "module",
	},
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["tsconfig.json", "node_modules/**/*", "dist/**/*", ".cache/**/*", "*.svg"],

	rules: {
		"array-callback-return": "error",
		"arrow-body-style": ["error", "as-needed"],
		"arrow-parens": ["error", "as-needed"],
		"arrow-spacing": "error",
		"dot-notation": "error",
		eqeqeq: ["error", "always", { null: "ignore" }],
		"no-array-constructor": "error",
		"no-duplicate-imports": "error",
		"no-iterator": "error",
		"no-loop-func": "error",
		"no-new-func": "error",
		"no-new-object": "error",
		"no-new-wrappers": "error",
		"no-prototype-builtins": 0,
		"no-redeclare": 0,
		"no-underscore-dangle": "error",
		"no-unneeded-ternary": "error",
		"no-useless-concat": "error",
		"no-useless-constructor": "error",
		"no-var": "error",
		"object-shorthand": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": [
			"error",
			{
				destructuring: "all",
				ignoreReadBeforeAssign: true,
			},
		],
		"prefer-destructuring": "error",
		"prefer-rest-params": "error",
		"prefer-template": "error",
		"quote-props": ["error", "as-needed"],
		"spaced-comment": ["error", "always", { markers: ["/"] }],
		"require-atomic-updates": 0,
		yoda: ["error", "never"],
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				groups: [
					"builtin", // Built-in types are first
					"external",
					["sibling", "parent"], // Then sibling and parent types. They can be mingled together
					"index", // Then the index file
					"object",
					// Then the rest: internal and external type
				],
			},
		],

		// tree shaking guard
		"no-restricted-imports": [
			"error",
			{
				paths: [
					{ name: "lodash", message: "Please treeshake like 'import { get } from \"lodash/get\";'." },
					{
						name: "@fortawesome/pro-solid-svg-icons",
						message: "Please treeshake like 'import { faTimes } from \"@fortawesome/pro-solid-svg-icons/faTimes\";'.",
					},
					{
						name: "@fortawesome/pro-regular-svg-icons",
						message: "Please treeshake like 'import { faTimes } from \"@fortawesome/pro-regular-svg-icons/faTimes\";'.",
					},
					{
						name: "@fortawesome/free-brands-svg-icons",
						message:
							"Please treeshake like 'import { faTwitter } from \"@fortawesome/free-brands-svg-icons/faTwitter\";'.",
					},
				],
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: true,
			node: true,
		},
	},
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/eslint-plugin/recommended"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: true,
			},
			plugins: ["@typescript-eslint"],
			rules: {
				"id-denylist": ["error", "PropTypes", "propTypes", "defaultProps"],
				"@typescript-eslint/consistent-type-assertions": "error",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-unused-vars": "error",
				"@typescript-eslint/prefer-includes": "error",
				"@typescript-eslint/consistent-type-definitions": ["error", "type"],
				"@typescript-eslint/consistent-type-imports": ["error"],

				// note you must disable the base rule as it can report incorrect errors
				"no-useless-constructor": "off",
				"@typescript-eslint/no-useless-constructor": ["error"],

				"no-dupe-class-members": "off", // disable the original rule first
				"@typescript-eslint/no-dupe-class-members": ["error"],
				"@typescript-eslint/type-annotation-spacing": ["error"],
				"@typescript-eslint/no-unnecessary-type-assertion": ["error"],
				"@typescript-eslint/no-unnecessary-type-arguments": ["error"],
				"@typescript-eslint/no-unnecessary-qualifier": ["error"],
				"@typescript-eslint/no-unsafe-enum-comparison": ["error"],
				"@typescript-eslint/await-thenable": ["error"],

				// note you must disable the base rule as it can report incorrect errors
				"no-duplicate-imports": "off",
			},
		},
	],
};

module.exports = config;
