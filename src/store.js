export default {
  debug: true,
  state: {
    results: {},
    formattedResults: {},
    latLng: {
      lat: '45.5231',
      lng: '-122.6765'
    },
    dateTime: new Date()
  },
  getResults () {
    return this.state.results
  },
  setResults (newResults) {
    if (this.debug) console.log('setResults triggered with', JSON.stringify(newResults))
    this.state.results = newResults
  },
  setFormattedResults (newResults) {
    if (this.debug) console.log('setFormatted Results triggered with', JSON.stringify(newResults))
    this.state.formattedResults = newResults
  },
  setPosition (position) {
    if (this.debug) console.log('setPosition triggered with', position)
    this.state.latLng = position
  }
}
