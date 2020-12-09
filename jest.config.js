const jestConfig = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        "__config__":{
        },
        "ts-jest": {
            diagnostics: {
                ignoreCodes: [6059,18002,18003,2307]
            }
        }
    },
    moduleFileExtensions: [
        "js",
        "jsx",
        "tsx",
        "ts",
        "node"
    ],
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy",
        "@material-ui/core/([^\/]+)$": "<rootDir>/__mocks__/material-ui/core/$1"
    }
}

module.exports = jestConfig;
