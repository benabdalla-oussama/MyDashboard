<template>
    <section class="charts">
        <h3>pie-basic</h3>
        <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
    </section>
</template>
<script>
    import VueHighcharts from '../js/VueHighcharts.vue'
    import * as data from '../data/data.js'

export default {
  components: {
    VueHighcharts,
  },
  data() {
    return {
      pieOptions: data.PieData,
    }
  },
  mounted() {},
  methods: {},
}
</script>
