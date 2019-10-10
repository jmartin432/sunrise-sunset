export default {
  debug: true,
  state: {
    results: {}
  },
  setResults (newResults) {
    if (this.debug) console.log('setResults triggered with', JSON.stringify(newResults))
    this.state.results = newResults
  }
}
