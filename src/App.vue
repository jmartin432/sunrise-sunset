<template>
  <div id="main">
    <div id='container'>
      <div id="input-container">
        <AppInput parentGetData="getData">Input</AppInput>
      </div>
      <div id="results-container">
        <AppResults parentGetData="getData">Results</AppResults>
      </div>
    </div>
    <AppMap>Map</AppMap>
<!--    <router-view/>-->
  </div>
</template>

<script>
import AppInput from './components/AppInput'
import AppResults from './components/AppResults'
import AppMap from './components/AppMap'

export default {
  name: 'App',
  components: {AppMap, AppInput, AppResults}
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  z-index: 100;
  position: absolute;
}
</style>
