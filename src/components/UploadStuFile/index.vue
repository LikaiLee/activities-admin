<template>
  <div>
    <el-button :loading="loading" icon="el-icon-fa-file-excel-o" type="primary" @click="handleUpload">选择文件</el-button>
    <slot></slot>
    <input @change="handleFileChange" class="excel-upload-input" type="file" accept=".xlsx, .xls" ref="uploadInput">
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    header: {
      type: Array,
      required: true,
      default() { return [] }
    }
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateDate({ header, results }, file) {
      this.excelData.header = header
      this.excelData.results = results
      this.loading = false
      this.$emit('on-selected-file', file, this.excelData)
      this.$refs.uploadInput.value = ''
    },
    handleUpload() {
      this.$refs.uploadInput.click()
    },
    handleFileChange(e) {
      this.loading = true
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet, {
          // raw: true,
          range: 1,
          defval: '',
          header: this.header
        })
        this.generateDate({ header, results }, itemFile)
      }
      reader.readAsArrayBuffer(itemFile)
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) {
          hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
      }
      return headers
    }
  }
}
</script>

<style scoped>
.excel-upload-input {
  display: none;
}
</style>
