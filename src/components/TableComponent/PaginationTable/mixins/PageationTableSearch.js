const pageTableSearch = {
  data() {
    return {
      searchContentFound: false,
      currentSearchContent: '',
      currentSearchCol: '',
      originPage: -1
    }
  },
  methods: {
    searching(content = '', col = '', mid = false) {
      if (this.currentSearchContent !== content || this.currentSearchCol !== col) {
        this.showData()
        this.$refs['originTable'].showData()
      }
      this.currentSearchCol = col
      this.currentSearchContent = content
      if (!content) {
        if (this.originPage > 0) {
          this.pageTo(this.originPage)
          this.originPage = -1
        }
      } else {
        if (!mid) {
          this.originPage = this.currentPage
        }
        this.$refs['originTable'].searchInTable(content, col)
      }
    },

    searchNotFound() {
      const lastPage = Math.ceil(this.currentTotal / this.pageSize)
      if (this.currentPage < lastPage) {
        this.pageTo(this.currentPage + 1)
        this.searchAfter()
      } else if (this.searchContentFound) {
        this.toFirstPage()
        this.searchContentFound = false
        this.searchAfter()
      } else {
        this.$refs['originTable'].showNoData()
      }
    },

    searchFound() {
      this.searchContentFound = true
      this.originPage = this.currentPage
    },

    searchAfter(mid = true) {
      this.$nextTick(() => {
        this.searching(this.currentSearchContent, this.currentSearchCol, mid)
      })
    }
  }
}

export default pageTableSearch
