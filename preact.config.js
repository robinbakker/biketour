import asyncPlugin from 'preact-cli-plugin-async';

export default (config, env, helpers) => {
    asyncPlugin(config);
    let uglify = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
    if (uglify) {
      uglify.plugin.options.sourceMap = false;
    }
}