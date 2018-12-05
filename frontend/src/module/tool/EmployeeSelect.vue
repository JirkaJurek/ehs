<template>
  <v-select v-bind="currentProps" :items="employees" @change="changeInner" item-text="name" item-value="id" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Zaměstnanci"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    "persistent-hint": {
      type: Boolean,
      default: true
    },
    "return-object": {
      type: Boolean,
      default: true
    },
    change: Function
  },
  created() {
    this.$store.dispatch("loadAllUsers");
  },
  computed: {
    employees() {
      return this.$store.state.user.users;
    },
    currentProps() {
      return this.$props;
    }
  },
  methods: {
    changeInner(values) {
      return this.change ? this.change(values) : this.$emit("change", values);
    }
  }
};
</script>