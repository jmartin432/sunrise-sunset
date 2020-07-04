<template>
    <div id='map'></div>
</template>

<script>
import * as googleMaps from 'google-maps'
import store from '../store'

console.log('ENV: ' + JSON.stringify(process.env))
const mapIcon = require('../assets/unicorn-16x16.png')
const secrets = require('../secrets.json')
const key = (process.env.NODE_ENV === 'development') ? secrets.dev.mapsApiKey : secrets.prod.mapsApiKey
const loader = new googleMaps.Loader(key, {})

export default {
  name: 'AppMap',
  data () {
    return {
      appMap: '',
      mapMarker: '',
      dataStore: store.state
    }
  },
  watch: {
    dataStore: {
      deep: true,
      handler (val) {
        console.log('Map Store Watch: ' + JSON.stringify(val))
        this.appMap.setCenter(this.mapCenter)
        this.mapMarker.setPosition(this.mapCenter)
      }
    }
  },
  computed: {
    mapCenter: function () {
      return { lat: this.latitudeFloat, lng: this.longitudeFloat }
    },
    latitudeFloat: function () {
      return parseFloat(this.dataStore.latLng.lat)
    },
    longitudeFloat: function () {
      return parseFloat(this.dataStore.latLng.lng)
    }
  },
  mounted () {
    loader.load().then((google) => {
      this.appMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: this.mapCenter,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      })
      this.mapMarker = new google.maps.Marker({
        position: this.mapCenter,
        map: this.appMap,
        title: "I'm a Unicorn!",
        icon: mapIcon
      })
      this.appMap.addListener('click', (event) => {
        let position = {
          lat: parseFloat(event.latLng.lat().toFixed(4)).toString(),
          lng: parseFloat(event.latLng.lng().toFixed(4)).toString()
        }
        store.setPosition(position)
      })
    })
  }
}
</script>

<style scoped>
#map {
  margin: 0px 0px 0px 0px;
  border-radius: 5px;
  border : 1px solid red;
  /*display: inline-block;*/
  width: 100vw;
  height: 100%;
  position: absolute;
  margin: 0px 0px 0px 0px;
  z-index: 0
}
</style>
