<template>
  <div id="results">
    <div id="canvas">
      <canvas id="cnv" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'AppCanvas',
  data () {
    return {
      ctx: '',
      canvas: '',
      dataStore: store.state
    }
  },
  computed: {

  },
  mounted: function () {
    this.canvas = document.querySelector('#cnv')
    this.ctx = this.canvas.getContext('2d')
    this.initializeCanvas()
  },

//
</script>

<style scoped>
#canvas {
    display: inline-block;
    border-radius: 5px;
    border : 1px solid black;
    margin: 20px;
    height: 400px;
    width: 400px;
}
canvas{
}
</style>
