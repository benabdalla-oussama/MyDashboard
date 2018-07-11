Vue.component("areaSettings",
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
                if (this.formData.area)
                    this.chart.options.chart.type = "area";
                else
                    this.chart.options.chart.type = "line";
               
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
               
                if (this.chart.options.chart.type === "area")
                    this.formData.area=true;
                else
                    if (this.chart.options.chart.type === "line")
                        this.formData.area = false;

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
            this.chart.options = AreaData;
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

var AreaData = {
    chart: {
        type: 'area'
    },
    title: {
        text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
        text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
            'thebulletin.metapress.com</a>'
    },
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
        line: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'USA',
        data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
            1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
            27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
            26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
            22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
            10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
    }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null, null, null, null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
            4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
            15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
            33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
            35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000]
    }]
}