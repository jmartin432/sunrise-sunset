<template>
    <div id="app-canvas">
      <canvas id="cnv" width="400" height="400"></canvas>
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
    angles: function () {
      console.log('computeAngels:' + JSON.stringify(this.dataStore.results))
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
  mounted: function () {
    this.canvas = document.querySelector('#cnv')
    this.ctx = this.canvas.getContext('2d')
    this.initializeCanvas()
  },
  watch: {
    angles: {
      deep: true,
      handler (val) {
        console.log('canvas watch: ' + JSON.stringify(val))
        this.updateCanvas()
      }
    }
  },
  methods: {
    initializeCanvas () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(200, 200, 150, 0, 2 * -Math.PI)
      this.ctx.fillStyle = '#151515'
      this.ctx.fill()
      this.ctx.font = '15px Arial'
      this.ctx.fillStyle = 'black'
      this.ctx.fillText('Noon', 180, 40)
      this.ctx.fillText('Midnight', 170, 365)
      this.ctx.fillText('6PM', 360, 210)
      this.ctx.fillText('6AM', 10, 210)
    },
    updateCanvas () {
      this.ctx.beginPath()
      this.ctx.arc(200, 200, 150, 0, 2 * -Math.PI)
      this.ctx.fillStyle = '#151515'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(200, 200)
      this.ctx.arc(
        200, 200, 150, this.angles.astronomical_twilight_begin_angle,
        this.angles.astronomical_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#333300'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(200, 200)
      this.ctx.arc(
        200, 200, 150, this.angles.nautical_twilight_begin_angle,
        this.angles.nautical_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#808000'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(200, 200)
      this.ctx.arc(
        200, 200, 150, this.angles.civil_twilight_begin_angle,
        this.angles.civil_twilight_end_angle
      )
      this.ctx.closePath()
      this.ctx.fillStyle = '#b3b300'
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(200, 200)
      this.ctx.arc(200, 200, 150, this.angles.sunrise_angle, this.angles.sunset_angle)
      this.ctx.closePath()
      this.ctx.fillStyle = '#ffff00'
      this.ctx.fill()
      let solarNoonX = 150 * Math.cos(this.angles.solar_noon_angle)
      let solarNoonY = -150 * Math.sin(this.angles.solar_noon_angle)
      this.ctx.beginPath()
      this.ctx.moveTo(200, 200)
      this.ctx.lineTo(200 + solarNoonX, 200 - solarNoonY)
      this.ctx.strokeStyle = '#ff0000'
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(50, 200)
      this.ctx.lineTo(350, 200)
      this.ctx.moveTo(200, 50)
      this.ctx.lineTo(200, 350)
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#000000'
      this.ctx.stroke()
    }
  }
}
//
</script>

<style scoped>
#app-canvas {
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
