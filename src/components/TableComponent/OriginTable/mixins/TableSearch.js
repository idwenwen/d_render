const SearchTable = {
  date() {
    return {
      searched: -1,
      searchedCol: '',
      searchedContent: ''
    }
  },
  methods: {
    notSearched() {
      this.searched = -1
    },
    search(list, content = '', col = '') {
      if (!content || this.searchedContent !== content || this.searchedCol !== col) {
        this.searched = -1
      }
      this.searchedCol = col
      this.searchedContent = content
      if (this.searchedContent) {
        const searchResult = this.searching(this.searchedContent, this.searchedCol, this.searched, list)
        if (searchResult < 0) {
          this.$emit('not-found')
        } else {
          this.searched = searchResult
          if (this.setCurrentRow) {
            this.setCurrentRow(searchResult)
          }
          this.$emit('found')
        }
      }
    },
    searching(content, col, begin, list) {
      let res = -1
      for (let i = begin + 1; i < list.length; i++) {
        const val = list[i]
        if (!col) {
          for (const key in val) {
            if (val[key].toString().match(content)) {
              res = i
              break
            }
          }
          if (res > begin) break
        } else {
          if (val[col].toString().match(content)) {
            res = i
            break
          }
        }
      }
      return res > begin ? res : -1
    }
  }
}

export default SearchTable
