<template>
  <div id="app">
    <div id="intro">
      <ul>
        <li>Pick a date with the date picker.</li>
        <li>Enter a latitude and longitude manually or by clicking on the map. The map will recenter to manual entries
          after 'submit' is clicked. Clicking the map will also populate the latitude and longitude inputs.</li>
        <li>Results from <a href="https://sunrise-sunset.org/api">sunrise-sunset.org</a> will be displayed in the far
          right and the middle graphic will update with solar noon as the red line and a color gradient corresponding to the
          <a href="https://en.wikipedia.org/wiki/Twilight">civil, nautical, and astronomical twilights</a>.</li>
        <li>All time are currently in UTC.</li>
      </ul>
    </div>
    <h1>Sunrise Sunset Times</h1>
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
ul {
  padding: 0px 0px 0px 30px;
  text-align: left;
}
</style>
