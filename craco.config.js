const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    webpack: {
        plugins: {
            add: [
                new TsconfigPathsPlugin({
                    configFile: resolveApp('tsconfig.json'),
                }),
            ],
        },
    },
};