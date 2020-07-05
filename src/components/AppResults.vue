<template>
    <div id="results">
      <div id="canvas">
        <canvas id="cnv" v-bind:width="canvasWidth" v-bind:height="canvasWidth"></canvas>
      </div>
      <div id="data" class="tooltip">
        <ul>
          <li v-for="(key, value) in resultsFormatted" v-bind:key="key.id">
            {{value}}: {{ key }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import store from '../store'

export default {
  name: 'AppResults',
  data: function () {
    return {
      ctx: '',
      canvas: '',
      dataStore: store.state
    }
  },
  computed: {
    canvasWidth: function () {
      return 300
    },
    canvasCenter: function () {
      return this.canvasWidth / 2
    },
    canvasRadius: function () {
      return this.canvasCenter * 0.8
    },
    resultsFormatted: function () {
      return this.dataStore.formattedResults
    },
    angles: function () {
      let r = this.dataStore.results
      let a = {}
      for (let item in r) {
        let time = r[item].split(/:| /)
        let hours = parseInt(time[0])
        let minutes = parseInt(time[1])
        let seconds = parseInt(time[2])
        if (time.length === 4) {
          if (time[3] === 'AM' && hours === 12) { hours = 0 }
          if (time[3] === 'PM' && hours !== 12) { hours += 12 }
        }
        let totalSeconds = hours * 3600 + minutes * 60 + seconds
        a[`${item}_angle`] = (totalSeconds * Math.PI / 43200) + (Math.PI / 2)
      }
      return a
    }
  },
  watch: {
    angles: {
      deep: true,
      handler () {
        this.updateCanvas()
      }
    }
  },
  methods: {
    initializeCanvas () {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth)
      this.ctx.beginPath()
      this.ctx.arc(this.canvasCenter, this.canvasCenter, this.canvasRadius, 0, 2 * -Math.PI)
      this.ctx.fillStyle = '#151515'
      this.ctx.fill()
      this.ctx.font = '10px Arial'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('Noon', this.canvasCenter - 12, this.canvasCenter - this.canvasRadius - 10)
      this.ctx.fillText('Midnight', this.canvasCenter - 17, this.canvasCenter + this.canvasRadius + 15)
      this.ctx.fillText('6PM', this.canvasCenter + this.canvasRadius + 5, this.canvasCenter + 4)
      this.ctx.fillText('6AM', this.canvasCenter - this.canvasRadius - 25, this.canvasCenter + 4)
    },
    updateCanvas () {
      this.ctx.beginPath()
      this.ctx.arc(this.canvasCenter, this.canvasCenter, this.canvasRadius, 0, 2 * -Math.PI)
      this.ctx.fillStyle = '#151515'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter)
      this.ctx.arc(
        this.canvasCenter, this.canvasCenter, this.canvasRadius, this.angles.astronomical_twilight_begin_angle,
        this.angles.astronomical_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#333300'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter)
      this.ctx.arc(
        this.canvasCenter, this.canvasCenter, this.canvasRadius, this.angles.nautical_twilight_begin_angle,
        this.angles.nautical_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#808000'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter)
      this.ctx.arc(
        this.canvasCenter, this.canvasCenter, this.canvasRadius, this.angles.civil_twilight_begin_angle,
        this.angles.civil_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#b3b300'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter)
      this.ctx.arc(this.canvasCenter, this.canvasCenter, this.canvasRadius, this.angles.sunrise_angle, this.angles.sunset_angle)
      this.ctx.closePath()
      this.ctx.fillStyle = '#ffff00'
      this.ctx.fill()
      let solarNoonX = this.canvasRadius * Math.cos(this.angles.solar_noon_angle)
      let solarNoonY = -this.canvasRadius * Math.sin(this.angles.solar_noon_angle)
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter)
      this.ctx.lineTo(this.canvasCenter + solarNoonX, this.canvasCenter - solarNoonY)
      this.ctx.strokeStyle = '#ff0000'
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(this.canvasCenter - this.canvasRadius, this.canvasCenter)
      this.ctx.lineTo(this.canvasCenter + this.canvasRadius, this.canvasCenter)
      this.ctx.moveTo(this.canvasCenter, this.canvasCenter - this.canvasRadius)
      this.ctx.lineTo(this.canvasCenter, this.canvasCenter + this.canvasRadius)
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#000000'
      this.ctx.stroke()
    }
  },
  mounted: function () {
    this.canvas = document.querySelector('#cnv')
    this.ctx = this.canvas.getContext('2d')
    this.initializeCanvas()
  }
}
</script>

<style scoped>
#results div{
  background-color: rgba(30, 30, 30, 0.8);
}
#canvas {
  display: inline-block;
  position: relative;
}
#results .tooltip {
  visibility: hidden;
  color: #fff;
  text-align: left;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  width: 500px;
  top: 200px;
  left: 105%;
  z-index: 100;
  opacity: 0;
  transition: opacity 1s;
}
#results:hover .tooltip {
  visibility: visible;
  opacity: 1;
  -webkit-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}
#results {
  display: inline-block;
  border-radius: 5px;
  border : 1px solid black;
  margin: 20px;
}
</style>
