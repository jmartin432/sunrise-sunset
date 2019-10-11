<template>
  <div id="inputs">
    <div id="text">
<!--      <label for="latitude">Latitude:</label>-->
      <input id="latitude" type="text" v-model="latitude" @change="validateInputs">
<!--      <label for="longitude">Longitude:</label>-->
      <input id="longitude" type="text" v-model="longitude" @change="validateInputs">
<!--      <label for="date">Date:</label>-->
      <input id="date" type="date" v-model="dateString" @change="validateInputs">
      <button id="submit" v-on:click="handleSubmit" :disabled="!validInput">Submit</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import store from '../store'
import googleMaps from 'google-maps'

const sunriseUrl = 'https://api.sunrise-sunset.org/json'
const mapIcon = require('../assets/unicorn-16x16.png')
const secrets = require('../secrets.json')
console.log('ENV: ' + JSON.stringify(process.env))
googleMaps.KEY = (process.env.NODE_ENV === 'development') ? secrets.dev.mapsApiKey : secrets.prod.mapsApiKey

function getDateString (date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  return `${year}-${month}-${day}`
}

export default {
  name: 'AppInput',
  data () {
    return {
      latitude: '',
      longitude: '',
      dateString: '',
      latLngPattern: new RegExp(/^-?[0-9]{0,3}\.[0-9]*$/),
      datePattern: new RegExp(/^[12][0-9]{3}-[01][0-9]-[0123][0-9]$/),
      validInput: true,
      appMap: '',
      dataStore: store.state
    }
  },
  computed: {
    mapCenter: function () {
      return { lat: this.latitudeFloat, lng: this.longitudeFloat }
    },
    latitudeFloat: function () {
      return parseFloat(this.latitude)
    },
    longitudeFloat: function () {
      return parseFloat(this.longitude)
    }
  },
  mounted () {
    this.latitude = '45.5231'
    this.longitude = '-122.6765'
    this.dateTime = new Date()
    this.dateString = getDateString(this.dateTime)
    googleMaps.load((google) => {
      console.log(process.env)
      this.appMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: this.mapCenter,
        fullscreenControl: false,
        streetViewControl: false
      })
      let marker = new google.maps.Marker({
        position: this.mapCenter,
        map: this.appMap,
        title: "I'm a Unicorn!",
        icon: mapIcon
      })
      this.appMap.addListener('click', (event) => {
        console.log(event.latLng.lat().toFixed(4), event.latLng.lng().toFixed(4))
        this.latitude = parseFloat(event.latLng.lat().toFixed(4))
        this.longitude = parseFloat(event.latLng.lng().toFixed(4))
        this.appMap.setCenter(this.mapCenter)
        marker.setPosition(this.mapCenter)
      })
    })
  },
  methods: {
    handleSubmit: function () {
      jQuery.ajax({
        method: 'GET',
        url: sunriseUrl,
        dataType: 'json',
        data: {
          lat: this.latitude,
          lng: this.longitude,
          date: this.dateString
        },
        error: function (req, err) {
          console.log('Sunrise call failed:' + err)
        }
      }).done((response) => {
        console.log('done ' + JSON.stringify(response))
        this.dataStore.results = response.results
      })
      console.log(this.mapCenter, this.latitude, this.longitude, this.latitudeFloat, this.longitudeFloat)
      this.appMap.setCenter(this.mapCenter)
    },
    validateInputs () {
      console.log('validating Inputs')
      console.log(this.latLngPattern.test(this.latitude) && this.latLngPattern.test(this.longitude) && this.datePattern.test(this.dateString))
      return this.latLngPattern.test(this.latitude) && this.latLngPattern.test(this.longitude) && this.datePattern.test(this.dateString)
    }
  },
  watch: {
    dataStore: {
      deep: true,
      handler (val) {
        console.log('Input watch: ' + JSON.stringify(val))
      }
    },
    latitude: function () {
      this.validInput = this.validateInputs()
    },
    longitude: function () {
      this.validInput = this.validateInputs()
    },
    dateString: function () {
      this.validInput = this.validateInputs()
    }
  }
}
</script>

<style scoped>
#inputs{
  display: inline-block;
  border-radius: 5px;
  border : 1px solid black;
  margin: 20px;
  height: 400px;
  width: 400px;
}
#map {
  margin: 0px 10px 0px 10px;
  border-radius: 5px;
  border : 1px solid black;
  display: inline-block;
  height: 300px;
  width: 300px;
}
label {
  text-align: right;
}
input {
  display: block
}
</style>
