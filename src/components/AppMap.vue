<template>
    <div id='map'></div>
</template>

<script>
import * as googleMaps from 'google-maps'
import store from '../store'

const mapIcon = require('../assets/unicorn-16x16.png')
const key = process.env.VUE_APP_GOOGLE_MAPS_API_KEY
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
      handler () {
        this.mapMarker.setPosition(this.mapLocation)
      }
    }
  },
  computed: {
    mapLocation: function () {
      return { lat: this.latitudeFloat, lng: this.longitudeFloat }
    },
    latitudeFloat: function () {
      return parseFloat(this.dataStore.latLng.lat)
    },
    longitudeFloat: function () {
      return parseFloat(this.dataStore.latLng.lng)
    }
  },
  methods: {
  },
  mounted () {
    loader.load().then((google) => {
      this.appMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: this.mapLocation,
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
        position: this.mapLocation,
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
  margin: 0px;
  /*display: inline-block;*/
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: 0
}
</style>
