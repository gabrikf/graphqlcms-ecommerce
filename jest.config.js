module.exports = {
    testPathIgnorePatterns:["/node_modules"],
    setupFilesAfterEnv:[
        "<rootDir>/setupTests.ts"
    ],
    transform:{
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper:{
        "\\.(scss|css|sass)$": "identity-obj-proxy",
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    collectCoverage: false,
    collectCoverageFrom:[
        "src/**/*.tsx",
        "!src/**/*.spec.tsx"
    ],
    coverageReporters:["lcov","json" ]
}