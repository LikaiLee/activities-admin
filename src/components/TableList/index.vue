<template>
  <div class="table-list">
    <div>table-list组件</div>
    <slot name="table"></slot>
    <slot name="pagination"></slot>
    <slot name="dialog"></slot>
  </div>
</template>
<script>
export default {
  name: 'TableList',
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
