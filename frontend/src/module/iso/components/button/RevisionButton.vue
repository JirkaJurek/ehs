<template>
  <v-chip @click="showRevision(id)">{{ 'Přehled revizí' }}</v-chip>
</template>

<script>
import BaseMixin from "../../mixins/base";

export default {
  props: ["lastRevisionIndex", "id"],
  mixins: [BaseMixin]
};
</script>
