Vue.component("scatterSettings",
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
                                                <input type="checkbox" id="checkbox1_1" v-bind:true-value="true" v-bind:false-value="false" class="md-check"  v-model="formData.area">  
                                                <label for="checkbox1_1">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Area
                                                </label>
                                            </div>
                                            <div class="md-checkbox">
                                                <input type="checkbox" id="checkbox1_2" class="md-check" v-bind:true-value="false" v-bind:false-value="true"   v-model="formData.area">
                                                <label for="checkbox1_2">
                                                    <span></span>
                                                    <span class="check"></span>
                                                    <span class="box"></span> Line
                                                </label>
                                            </div>
                                   
                                 
                                      
                                        </div>
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
            return {
                formData: {
                    title: '',
                    subtitle: '',
                    series: '',
                    dataOptions: '',
                    option3d: false,
                    datalabel: false,
                    area: true,
                    legend: false,
                    color: true,
                    datasource: []
                }
            }
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
            processForm: function () {

                this.chart.options.title.text = this.formData.title;
                this.chart.options.subtitle.text = this.formData.subtitle;
               

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
                this.formData.area = true;


                this.formData.dataOptions = '';
                $("#submitbtn").html('Add');
            },
            loadSettings() {

                this.formData.title = this.chart.options.title.text;
                this.formData.subtitle = this.chart.options.subtitle.text;

                this.formData.dataOptions = this.chart.options.url;
                console.log('Form Data Updated');
                $("#submitbtn").html('Update');
                this.updated = true;
            }
        }
        ,
        mounted() {

        },
        created() {
            this.chart.options = scatterData;
            this.getdata();
            console.log('donut Created');
            this.$eventHub.$on('loadSettings', this.loadSettings);
        },
        watch: {
            chart: function () {
                console.log(this.updated + "Chart Updated " + this.chart);
                this.loadSettings();
            }
        },

    });

var scatterData = {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Height Versus Weight of 507 Individuals by Gender'
    },
    subtitle: {
        text: 'Source: Heinz  2003'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },

    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    series: []
}


//{
//    name: 'Female',
//        color: 'rgba(223, 83, 83, .5)',
//        data: [
//        [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
//        [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
//        [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
//        [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
//        [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
//        [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
//        [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
//        [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
//        [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],


//    ]

//}, {
//    name: 'Male',
//        color: 'rgba(119, 152, 191, .5)',
//        data: [
//        [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
//        [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
//        [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
//        [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
//        [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
//        [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
//        [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
//        [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],

//    ]
//}