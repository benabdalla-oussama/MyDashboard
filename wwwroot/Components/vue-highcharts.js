Vue.component('vue-highcharts', {
    template: `  <div :class="classname"
                  :style = "styles" >
                    </div >  `,
    props: {
        classname: {
            type: String,
            default: 'vue-highcharts',
        },
        styles: {
            type: Object,
            default: function () {
                return {}
            },
        },
        options: {},
        highcharts: Object,
        test: 'rr'
    },
    name: 'VueHighcharts',
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        if (!this.getChart() && this.options) {
            this.init()
        }
    },

    methods: {
        getChart() {
            return this.chart
        },

        addSeries(options) {
            this.delegateMethod('addSeries', options)
        },
        removeSeries() {
            while (this.getChart().series.length !== 0) {
                this.getChart().series[0].remove()
            }
        },
        mergeOption(options) {
            this.delegateMethod('update', options)
        },
        showLoading(txt) {
            this.getChart().showLoading(txt)
        },
        hideLoading() {
            this.getChart().hideLoading()
        },
        delegateMethod(name, ...args) {
            if (!this.getChart()) {
                warn(
                    `Cannot call [$name] before the chart is initialized. Set prop [options] first.`,
                    this,
                )
                return
            }
            return this.getChart()[name](...args)
        },

        initHigcharts(product) { },

        init() {
            console.log("hello")
            if (!this.getChart() && this.options) {
                let highchartInstance = this.highcharts || Highcharts
                this.chart = new highchartInstance.Chart(this.$el, this.options)
            }
        },
    },

    watch: {
        test: function (val) {

            console.log('heyyyy')
        },
        options: function (options) {
            console.log("Options Updated");
            if (!this.getChart() && options) {

                this.init()
            } else {
                this.getChart().update(this.options)
            }
        },
    },

    beforeDestroy() {
        if (this.getChart()) {
            this.getChart().destroy()
        }
    },
});
