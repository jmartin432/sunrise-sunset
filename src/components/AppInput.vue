<template>
  <div id="input">
    <div id="fields">
      <input id="latitude" type="text" v-model="lat" @change="validateInputs">
      <input id="longitude" type="text" v-model="lng" @change="validateInputs">
      <input id="date" type="date" v-model="date" @change="validateInputs">
      <button id="submit" v-on:click="handleSubmit" :disabled="!validInput">Submit</button>
    </div>
    <div id="input-tooltip" class="tooltip">
      <ul>
        <li>Enter a latitude and longitude manually or by clicking on the map.</li>
        <li>Pick a date with the date picker.</li>
        <li>Results from <a href="https://sunrise-sunset.org/api" target="_blank">sunrise-sunset.org</a>
<!--        <li>Info on <a href="https://en.wikipedia.org/wiki/Twilight">civil, nautical, and astronomical twilights</a>.</li>-->
        <li>All time are currently in UTC.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store'
import jQuery from 'jquery'

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
      handler () {
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
  },
  mounted: function () {
    this.handleSubmit()
  }
}
</script>

<style scoped>
#input{
  display: inline-block;
  border-radius: 5px;
  border : 1px solid black;
  margin: 20px;
  background-color: rgba(30, 30, 30, 0.8);
}
#fields{
  margin: 10px;
}
#input .tooltip {
  visibility: hidden;
  color: #fff;
  text-align: left;
  padding: 5px 0;
  border-radius: 6px;
  background-color: rgba(30, 30, 30, 0.8);

  /* Position the tooltip text - see examples below! */
  position: absolute;
  width: 700px;
  top: 20px;
  left: 90%;
  z-index: 100;
  opacity: 0;
  transition: opacity 1s;
}
#input:hover .tooltip {
  visibility: visible;
  opacity: 1;
  -webkit-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}
label {
  text-align: right;
}
input {
  display: block;
  margin: 5px 5px 5px 5px;
}
</style>
