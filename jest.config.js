module.exports = {
	transform: {
		"^.+\\.ts$": "ts-jest",
		"^.+\\.js$": "<rootDir>/node_modules/babel-jest",
	},
	moduleFileExtensions: ["ts", "js", "json", "node"],
	globals: {
		"ts-jest": {
			tsConfigFile: "tsconfig.json",
			useBabelrc: true,
		},
	},
	testMatch: ["**/*.(spec|test).+(ts|js)"],
	transformIgnorePatterns: [],
};
