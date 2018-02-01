import merge from 'webpack-merge'
import process from 'process'

import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const commonConfig = {
    plugins: [
        vue({
            css: true,
        }),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};


let libraryConfig = merge({
    input: './src/vue-aui-jira-extras.js',
    output: [
        {file: pkg.main, format: 'cjs'},
        {file: pkg.module, format: 'es'}
    ]
}, commonConfig);

let docsConfig = merge({
    input: './docs/main.js',
    output: [
        {file: './dist/docs.js', format: 'cjs'},
    ],
}, commonConfig);

if (process.env.NODE_ENV === 'dev') {
    docsConfig.plugins.push(
        serve({
            open: true,
            contentBase: [
                "./dist",
                "./node_modules/@atlassian/aui/dist",
                "./node_modules/jquery/dist",
            ]
        })
    )
}

let rollupConfig = [
    libraryConfig,
    docsConfig
];


export default rollupConfig