
<template>
  <v-menu full-width offset-y :close-on-content-click="false" v-model="dateMenu" bottom>
    <v-btn color="primary" outline slot="activator">{{ range[0] }} &mdash; {{ range[1] }}</v-btn>
    <v-card>
      <v-card-text>
        <v-daterange ref="daterange" locale="cz" :first-day-of-week="1" :options="dateRangeOptions" @input="onDateRangeChange" :labels="labels" />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { format, subDays, addDays } from "date-fns";
import { DateRange } from "vuetify-daterange-picker";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";

export default {
  components: { [DateRange.name]: DateRange },
  props: {
    change: Function
  },
  data() {
    return {
      dateMenu: false,
      range: [],
      labels: {
        start: "Od",
        end: "Do",
        preset: "Předvolby"
      },
      dateRangeOptions: {
        // startDate: format(subDays(new Date(), 7), "YYYY-MM-DD"),
        // endDate: format(new Date(), "YYYY-MM-DD"),
        format: "D.M.YYYY",
        presets: [
          {
            label: "Restart",
            range: [undefined, undefined]
          },
          {
            label: "Dnes",
            range: [
              format(new Date(), "YYYY-MM-DD"),
              format(new Date(), "YYYY-MM-DD")
            ]
          }
          // {
          //   label: "Yesterday",
          //   range: [
          //     format(subDays(new Date(), 1), "YYYY-MM-DD"),
          //     format(subDays(new Date(), 1), "YYYY-MM-DD")
          //   ]
          // },
          // {
          //   label: "Last 30 Days",
          //   range: [
          //     format(subDays(new Date(), 30), "YYYY-MM-DD"),
          //     format(subDays(new Date(), 1), "YYYY-MM-DD")
          //   ]
          // }
        ]
      }
    };
  },
  methods: {
    onDateRangeChange(range) {
      this.range = range;
      return this.change ? this.change(range) : this.$emit("change", range);
    }
  }
};
</script>