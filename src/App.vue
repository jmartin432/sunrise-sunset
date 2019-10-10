<template>
  <div id="app">
    <h1>Sunrise Sunset</h1>
    <AppInput>Input</AppInput>
    <AppCanvas>Canvas</AppCanvas>
    <AppResults>Results</AppResults>
<!--    <router-view/>-->
  </div>
</template>

<script>
import AppInput from './components/AppInput'
import AppCanvas from './components/AppCanvas'
import AppResults from './components/AppResults'

export default {
  name: 'App',
  components: {AppCanvas, AppInput, AppResults}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
