﻿Vue.component("donutSettings",
    {
        template:
            ` <form  class="form-horizontal" style="margin: 5px"   v-on:submit.prevent="processForm">
                            <div class="form-body">

                            <div class="form-group form-md-checkboxes">
                                    <label class="col-md-3 control-label" for="form_control_1">Chart</label>
                                    <div class="col-md-9">
                                        <div class="md-checkbox-list">
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox33" v-bind:true-value="true" v-bind:false-value="false" class="md-check"  v-model="formData.pie">  
                                                <label for="checkbox33">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Pie
                                                </label>
                                            </div>
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox44" class="md-check" v-bind:true-value="false" v-bind:false-value="true"   v-model="formData.pie">
                                                <label for="checkbox44">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Donut
                                                </label>
                                            </div>
                                   
                                 
                                      
                                        </div>
                                    </div>
                                </div>
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
                                        <select id="data" class="form-control"  v-model="formData.dataOptions">
                                            <template  v-for="(element, index) in formData.datasource">
                                            <option  :value="index">{{ element.title }}</option>
                                            < /template>
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
                                        <button id="submitbtn" type="submit" class="btn green" v-on:submit.prevent="processForm">Add</button>

                                    </div>
                                </div>
                            </div>
                        </form> `,
        props: ['chart', 'updated'],
        data: function () {
            return { formData: {
                title: '', 
                subtitle: '',
                series: '',
                dataOptions: '',
                option3d: false, 
                datalabel: false,
                legend: false,
                color: true,
                datasource: [],
                pie : true
            } }
        },
        methods: {
            getdata() {
                $this = this;
                $.ajax({
                    type: "GET",
                    url: "data/",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        $this.formData.datasource = data;
                       
                    }, //End of AJAX Success function

                    failure: function (data) {
                        alert("failure");
                        alert(data.responseText);
                    }, //End of AJAX failure function
                    error: function (data) {
                        alert("erreur");
                        alert(data.responseText);
                    } //End of AJAX error function

                });
            },
            processForm: function() {

                if (this.formData.pie)
                    this.chart.options.plotOptions.pie.innerSize = "0";
                else
                    this.chart.options.plotOptions.pie.innerSize = "100";
                this.chart.options.title.text = this.formData.title;
                this.chart.options.subtitle.text = this.formData.subtitle;
                this.chart.options.series[0].colorByPoint = this.formData.color;
                this.chart.options.series[0].name = this.formData.series;
                this.chart.options.chart.options3d.enabled = this.formData.option3d;
                this.chart.options.plotOptions.pie.showInLegend = this.formData.legend;
                this.chart.options.plotOptions.pie.dataLabels.enabled = this.formData.datalabel;
                this.chart.options.dataconfig = this.formData.datasource[this.formData.dataOptions];
                console.log(this.chart.options.dataconfig);

                if (this.updated === false) {
                    this.$eventHub.$emit('add-chart', this.chart.options);
                } else {
                    this.$eventHub.$emit('change-chart', this.chart);
                    console.log("We are Done!");
                    
                }
                this.updated = false;
                this.formData.title = '';
                this.formData.subtitle = '';
                this.formData.color = false;
                this.formData.series = '';
                this.formData.option3d = false;
                this.formData.legend = false;
                this.formData.datalabel = false;
                this.formData.dataOptions = '';
                $("#submitbtn").html('Add');
            },
            loadSettings() {
              
                this.formData.title = this.chart.options.title.text ;
                this.formData.subtitle = this.chart.options.subtitle.text;
                this.formData.color = this.chart.options.series[0].colorByPoint;
                this.formData.series = this.chart.options.series[0].name ;
                this.formData.option3d = this.chart.options.chart.options3d.enabled ;
                this.formData.legend = this.chart.options.plotOptions.pie.showInLegend ;
                this.formData.datalabel = this.chart.options.plotOptions.pie.dataLabels.enabled;
                this.formData.dataOptions = this.chart.options.url;

                if (this.chart.options.plotOptions.pie.innerSize === "0")
                    this.formData.pie = true;
                else
                    if (this.chart.options.plotOptions.pie.innerSize === "100")
                    this.formData.pie = false;

                console.log('Form Data Updated');
                $("#submitbtn").html('Update');
                this.updated = true;
            }
        }
        ,
        mounted() {
         
        },
        created() {
            this.chart.options = PieData2;
            this.getdata();
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
var PieData2 = {

    chart: {
        type: 'pie',
        
        backgroundColor: null,
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
            innerSize: 0,
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
    series: [{}]
}