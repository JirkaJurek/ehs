<template>
  <div class="about">
    <h1>This is an about page</h1>
    <super
    msg='ahoj'
    v-on:up="up"
    ></super>
    <component :is="selectedComponent.component" :data="selectedComponent.data"></component>
  </div>
</template>

<script>
export default {
  data: () => ({
    textFontSizeClass: "test-size-1",
    selectedComponent: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nový nástroj" : "Editace nástroje";
    }
  },

  watch: {
    dialogNewItem(val) {
      val || this.closeDialogNewItem();
    },
    dialogAllRevisions(val) {
      val || this.closeDialogAllRevisions();
    },
    filter: {
      handler() {
        this.initialize();
      },
      deep: true
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    up(data) {
      console.log(data);
      this.selectedComponent = {
        component: "super",
        data: {a: 'super věci'}
      };
    },
    initialize() {
      this.tools = [
        {
          id: 1,
          supplier: "HOUFEK",
          category: {
            id: 1,
            name: "CNC"
          },
          name: "CNC frézka TITAN 623215-G5 HOUFEK",
          revizion: "",
          startWork: "2009",
          seriesNumber: "001/2009",
          internal: true,
          external: true,
          externalMaintenance: { value: "1 y", text: "Roční" },
          lastMaintenance: "2. 7. 2013 0:00:00",
          nextRevision: "5",
          comment: "Frozen Yogurt",
          employee: { id: 1, name: "Tester" },
          revisions: [
            { date: "2018-01-01", description: "popisek" },
            { date: "2017-01-01", description: "popisek" }
          ]
        },
        {
          id: 2,
          supplier: "",
          category: {
            id: 2,
            name: "Ruční nářadí"
          },
          name: "Vývěva VTLF 2.250/0-79  BECKER",
          revizion: "",
          startWork: "2015",
          seriesNumber: "2701913/2013",
          internal: true,
          external: true,
          externalMaintenance: { value: "1 m", text: "Měsíční" },
          lastMaintenance: "2. 7. 2013 0:00:00",
          nextRevision: "50",
          comment: "Frozen Yogurt",
          employee: { id: 2, name: "Uklízečka" },
          revisions: []
        },
        {
          id: 3,
          supplier: "",
          category: {
            id: 3,
            name: "Pily"
          },
          name: "Pila pásová UH 800 HEMA",
          revizion: "",
          startWork: "2008",
          seriesNumber: "83306/1979",
          internal: true,
          external: true,
          externalMaintenance: { value: "6 m", text: "Půlroční" },
          lastMaintenance: "28.-29.3.2013",
          nextRevision: "354",
          comment: "Frozen Yogurt",
          employee: { id: 3, name: "Modelář" },
          revisions: []
        }
      ];
    }
  }
};
</script>
