import pkg from './package.json'
import rpi_jsy from 'rollup-plugin-jsy'
const pkg_name = (pkg.name || 'private').replace('-', '_')

const configs = []
export default configs

const sourcemap = true
const external = []

const plugins = []

// Allow Node module resolution -- https://github.com/rollup/rollup-plugin-node-resolve
/// import rpi_resolve from 'rollup-plugin-node-resolve'
/// plugins.push(rpi_resolve({main: true, browser: true, modules: true}))

const plugins_nodejs = [ rpi_jsy({defines: {PLAT_NODEJS: true}}) ].concat(plugins)
const plugins_web = [ rpi_jsy({defines: {PLAT_WEB: true}}) ].concat(plugins)


// Allow Minification -- https://github.com/TrySound/rollup-plugin-terser
/// import { terser as rpi_terser } from 'rollup-plugin-terser'
/// const plugins_min = plugins_web.concat([ rpi_terser({}) ])


add_jsy('index', true, 'default')
add_jsy('plugin')
add_jsy('all')
add_jsy('db/pouch', false)
add_jsy('db/keyv', false)


function add_jsy(src_name, inc_min, exports='named') {
  const module_name = inc_min ? pkg_name : `${pkg_name}-${src_name}`

  if (plugins_nodejs)
    configs.push({
      input: `code/${src_name}.jsy`,
      plugins: plugins_nodejs, external,
      output: [
        { file: `cjs/${src_name}.js`, format: 'cjs', exports, sourcemap },
        { file: `esm/${src_name}.js`, format: 'es', sourcemap } ]})

  if (plugins_web)
    configs.push({
      input: `code/${src_name}.jsy`,
      plugins: plugins_web, external,
      output: [
        { file: `umd/${src_name}${inc_min ? '.dbg' : ''}.js`, format: 'umd', name:module_name, exports, sourcemap },
        { file: `esm/web/${src_name}.js`, format: 'es', sourcemap } ]})

  if (inc_min && 'undefined' !== typeof plugins_min)
    configs.push({
      input: `code/${src_name}.jsy`,
      plugins: plugins_min, external,
      output: { file: `umd/${src_name}.min.js`, format: 'umd', name:module_name, exports }})
}
