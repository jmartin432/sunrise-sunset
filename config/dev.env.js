'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MAPS_API_KEY: '"AIzaSyDkki0Hyqg23CFrOzhqE8Tygfge1OHmdZ4"'
})
