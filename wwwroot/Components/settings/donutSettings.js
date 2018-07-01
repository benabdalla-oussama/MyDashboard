Vue.component("donutSettings",
    {
        template:
            ` <form  class="form-horizontal" style="margin: 5px"   v-on:submit.prevent="processForm">
                            <div class="form-body">
                                <div class="form-group form-md-line-input">
                                    <label class="col-md-3 control-label" for="form_control_1">Title</label>
                                    <div class="col-md-9">
                                        <input id="title" type="text" class="form-control" placeholder="" v-model="formData.title">
                                        <div class="form-control-focus"> </div>
                                        <span class="help-block">Some help goes here...</span>
                                    </div>
                                </div>
                                <div class="form-group form-md-line-input has-error">
                                    <label class="col-md-3 control-label" for="form_control_1">Subtitle</label>
                                    <div class="col-md-9">
                                        <input id="subtitle" type="text" class="form-control" placeholder="" v-model="formData.subtitle">
                                        <div class="form-control-focus"> </div>
                                        <span class="help-block">Some help goes here...</span>
                                    </div>
                                </div>
                                <div class="form-group form-md-line-input has-warning">
                                    <label class="col-md-3 control-label" for="form_control_1">Series Name</label>
                                    <div class="col-md-9">
                                        <input id="series" type="text" class="form-control" placeholder="" v-model="formData.series">
                                        <div class="form-control-focus"> </div>
                                        <span class="help-block">Some help goes here...</span>
                                    </div>
                                </div>
                             
                                
                                <div class="form-group form-md-line-input has-success">
                                    <label class="col-md-3 control-label" for="form_control_1">Data</label>
                                    <div class="col-md-9">
                                        <select id="data" class="form-control" name="" v-model="formData.dataOptions">
                                            <option value="getData/">Sales per Country</option>
                                            <option value="getData2/">Sales per population</option>
                                            
                                        </select>
                                        <div class="form-control-focus"> </div>
                                        <span class="help-block">Some help goes here...</span>
                                    </div>
                                </div>
                            
                           
                           
                                <div class="form-group form-md-checkboxes">
                                    <label class="col-md-3 control-label" for="form_control_1">Chart</label>
                                    <div class="col-md-9">
                                        <div class="md-checkbox-list">
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox1_1" v-bind:true-value="true" v-bind:false-value="false" class="md-check"  v-model="formData.option3d">  
                                                <label for="checkbox1_1">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Option3D
                                                </label>
                                            </div>
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox1_2" class="md-check" v-bind:true-value="true" v-bind:false-value="false"   v-model="formData.datalabel">
                                                <label for="checkbox1_2">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> DataLabel
                                                </label>
                                            </div>
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox1_3" class="md-check" v-bind:true-value="true" v-bind:false-value="false"  v-model="formData.legend">
                                                <label for="checkbox1_3">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Legend
                                                </label>
                                            </div>
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox1_4" class="md-check" v-bind:true-value="true" v-bind:false-value="false"  v-model="formData.color">
                                                <label for="checkbox1_4">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> ColorByPoint
                                                </label>
                                            </div>
                                      
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            <div class="form-actions">
                                <div class="row">
                                    <div class="col-md-offset-3 col-md-9">
                                        <button type="submit" class="btn green" v-on:submit.prevent="processForm">Submit</button>

                                    </div>
                                </div>
                            </div>
                        </form> `,
        props: ['chart','updated'],
        data: function () {
            return { formData: {
                title: '', 
                subtitle: '',
                series: '',
                dataOptions: '',
                option3d: false, 
                datalabel: false,
                legend: false,
                color: true 
            } }
        },
        methods: {
            processForm: function() {

                this.chart.options.title.text = this.formData.title;
                this.chart.options.subtitle.text = this.formData.subtitle;
                this.chart.options.series[0].colorByPoint = this.formData.color;
                this.chart.options.series[0].name = this.formData.series;
                this.chart.options.chart.options3d.enabled = this.formData.option3d;
                this.chart.options.plotOptions.pie.showInLegend = this.formData.legend;
                this.chart.options.plotOptions.pie.dataLabels.enabled = this.formData.datalabel;
                this.chart.options.url = this.formData.dataOptions;

                if (this.updated === false) {
                    this.$eventHub.$emit('add-chart', this.chart.options);
                } else {
                    this.$eventHub.$emit('change-chart', this.chart);
                    console.log("We are Done!");
                    this.updated = false;
                }
            },
            loadSettings() {
              
                this.formData.title = this.chart.options.title.text ;
                this.formData.subtitle = this.chart.options.subtitle.text;
                this.formData.color = this.chart.options.series[0].colorByPoint;
                this.formData.series = this.chart.options.series[0].name ;
                this.formData.option3d = this.chart.options.chart.options3d.enabled ;
                this.formData.legend = this.chart.options.plotOptions.pie.showInLegend ;
                this.formData.datalabel = this.chart.options.plotOptions.pie.dataLabels.enabled;
                this.formData.dataOptions = this.chart.options.url ;
                console.log('Form Data Updated');
                this.updated = true;
            }
        }
        ,
        created() {
            this.chart.options = PieData ;
            console.log('donut Created');
            this.$eventHub.$on('loadSettings', this.loadSettings);
        },
        watch: {
            chart: function () {
                console.log(this.updated+"Chart Updated " + this.chart);
                this.loadSettings();
            }
        },

    });
var PieData = {

    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Dashboard 1'
    },
    subtitle: {
        text: 'Pie in Highcharts'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            },
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        colorByPoint: false,
        name: ' ',
        data: []
    }]
}