export default {
  debug: true,
  state: {
    results: {},
    latLng: {
      lat: '45.5231',
      lng: '-122.6765'
    },
    dateTime: new Date()
  },
  setResults (newResults) {
    if (this.debug) console.log('setResults triggered with', JSON.stringify(newResults))
    this.state.results = newResults
  },
  setPosition (position) {
    if (this.debug) console.log('setPosition triggered with', position)
    this.state.latLng = position
  }
}
