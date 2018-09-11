<template>
  <div class="hello">
    {{ msg }}
    <button v-on:click="test">test</button>
  </div>
</template>

<script>
export default {
  name: 'Super',
  props: {
    msg: String,
    data: Object
  },
  methods: {
    test() {
      this.$emit('up', 'cus')
    },
  },
  created() {
    console.log(this.data);
  },
}
</script>
