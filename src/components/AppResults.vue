<template>
    <div id="results">
      <ul>
        <li v-for="(key, value) in results" v-bind:key="key.id">
          {{value}}: {{ key }}
        </li>
      </ul>
    </div>
</template>

<script>
import store from '../store'

export default {
  name: 'AppResults',
  data: function () {
    return {
      dataStore: store.state
    }
  },
  computed: {
    results: function () {
      return this.dataStore.results
    }
  },
  watch: {
    dataStore: {
      deep: true,
      handler (val) {
        console.log('results watch: ' + JSON.stringify(val))
      }
    }
  }
}
</script>

<style scoped>
#results {
  display: inline-block;
  border-radius: 5px;
  border : 1px solid black;
  margin: 20px;
  height: 400px;
  width: 400px;
}
ul {
  list-style-type: none;
  padding: 0px 0px 0px 10px;
}
li{
  padding: 5px 0px 5px 0px;
}
</style>
