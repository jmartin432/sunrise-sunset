<template>
  <div id="inputs">
    <div id="text">
<!--      <label for="latitude">Latitude:</label>-->
      <input id="latitude" type="text" v-model="lat" @change="validateInputs">
<!--      <label for="longitude">Longitude:</label>-->
      <input id="longitude" type="text" v-model="lng" @change="validateInputs">
<!--      <label for="date">Date:</label>-->
      <input id="date" type="date" v-model="date" @change="validateInputs">
      <button id="submit" v-on:click="handleSubmit" :disabled="!validInput">Submit</button>
    </div>
<!--    <div id="map"></div>-->
  </div>
</template>

<script>
import jQuery from 'jquery'
import store from '../store'

const sunriseUrl = 'https://api.sunrise-sunset.org/json'

export default {
  name: 'AppInput',
  data () {
    return {
      latLngPattern: new RegExp(/^-?[0-9]{0,3}\.[0-9]+$/),
      datePattern: new RegExp(/^[12][0-9]{3}-[01][0-9]-[0123][0-9]$/),
      validInput: true,
      dataStore: store.state,
      lat: store.state.latLng.lat,
      lng: store.state.latLng.lng,
      date: this.initializeDate()
    }
  },
  computed: {
    position: function () {
      return { lat: this.lat, lng: this.lng }
    }
  },
  watch: {
    dataStore: {
      deep: true,
      handler (val) {
        console.log('Input Store watch: ' + JSON.stringify(val))
        this.lat = store.state.latLng.lat
        this.lng = store.state.latLng.lng
      }
    },
    lat: function () {
      this.validInput = this.validateInputs()
    },
    lng: function () {
      this.validInput = this.validateInputs()
    },
    date: function () {
      this.validInput = this.validateInputs()
    }
  },
  methods: {
    formatResults (results) {
      console.log('R: ', results)
      let formatted = {}
      for (let key in results) {
        let newKey = key.replace(/_/g, ' ')
        let splitKey = newKey.split(' ')
        for (let i = 0; i < splitKey.length; i++) {
          splitKey[i] = splitKey[i][0].toUpperCase() + splitKey[i].substr(1)
        }
        newKey = splitKey.join(' ')
        formatted[newKey] = results[key]
      }
      console.log('F:', formatted)
      return formatted
    },
    handleSubmit: function () {
      jQuery.ajax({
        method: 'GET',
        url: sunriseUrl,
        dataType: 'json',
        data: {
          lat: this.lat,
          lng: this.lng,
          date: this.date
        },
        error: function (req, err) {
          console.log('Sunrise call failed:' + err)
        }
      }).done((response) => {
        console.log('done ' + JSON.stringify(response))
        store.setFormattedResults(this.formatResults(response.results))
        store.setResults(response.results)
      })
      store.setPosition(this.position)
    },
    initializeDate () {
      let date = new Date()
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
    },
    validateInputs () {
      console.log('validating Inputs')
      console.log(this.latLngPattern.test(this.lat) && this.latLngPattern.test(this.lng) && this.datePattern.test(this.date))
      return this.latLngPattern.test(this.lat) && this.latLngPattern.test(this.lng) && this.datePattern.test(this.date)
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
}
label {
  text-align: right;
}
input {
  display: block;
  margin: 5px 5px 5px 5px;
}
</style>
