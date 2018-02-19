<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  mounted() {
    const editor = new Editor('#editor')
    editor.create()
  }
}
</script>

