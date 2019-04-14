<template>
  <span>{{user | employeeName}}</span>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    user() {
      return this.$store.getters.getUserById(this.id);
    }
  },
  created() {
    this.$store.dispatch("loadAllUsers");
  }
};
</script>
