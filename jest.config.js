module.exports= {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup.jest.ts"],
    testEnvironment: "jsdom",
    testMatch: ["**/+(*.)+(spec).+(ts)"],
    transform: {"^.+.(ts|mjs|js|html)$": ["jest-preset-angular",{tsconfig: "<rootDir>/tsconfig.spec.json",stringifyContentPathRegex: "\\.(html|svg)$",},],},
    transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|d3-.*))"],
    snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment",
    ],
    moduleFileExtensions: ["ts", "html", "js", "json"],
    collectCoverage: true,
    coverageReporters: ["html","lcov","text","json"],
    coverageDirectory: "coverage/jest-demo",
    };