<template>
  <v-icon small class="mr-2" @click="detail(id)">visibility</v-icon>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    detail(itemId) {
      this.$router.push(`/fe/tools/revision-type/${itemId}`);
    }
  },
  auth(ability) {
    return ability.can("page", "RevisionTypeDetail");
  }
};
</script>
