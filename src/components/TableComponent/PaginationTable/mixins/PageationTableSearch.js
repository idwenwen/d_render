const pageTableSearch = {
  data() {
    return {
      searchContentFound: false,
      searchingNow: false,
      currentSearchContent: '',
      currentSearchCol: ''
    }
  },
  methods: {
    searching(content = '', col = '') {
      this.searchingNow = false
      this.currentSearchCol = col
      this.currentSearchContent = content
      this.$ref['originTable'].searchInTable(content, col)
    },

    searchNotFound() {
      const lastPage = Math.ceil(this.currentTotal / this.pageSize)
      if (this.currentPage < lastPage) {
        this.pageTo(this.currentPage + 1)
        this.searchAfter()
      } else if (this.searchContentFound) {
        this.toFirstPage()
        this.searchContentFound = false
      }
      this.searchingNow = true
    },

    seearchFound() {
      this.searchContentFound = true
    },

    searchAfter() {
      this.$nextTick(() => {
        this.searching(this.currentSearchContent, this.currentSearchCol)
      })
    }
  }
}

export default pageTableSearch
