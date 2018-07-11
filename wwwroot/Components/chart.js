

Vue.component('chart',
    {
        template: ` <div>
            <vue-highcharts :options="pieOptions"  :high="myhigh" :width="mywidth" :type="mytype" ></vue-highcharts>
    </div>
     `,
        props: ['title', 'xAxis', 'yAxis', 'detail', 'url', 'high', 'width', 'msg', 'options','filters','type'],

        data() {

            return {
                pieOptions: [],
                myhigh: 500,
                mywidth: 500,
                mytype: ''
            }
        },
        mounted() {
            this.mytype = this.type;
            for (var index in this.filters) {
                this.$eventHub.$emit('push-filter', this.filters[index]);
            }
        },
        created: function () {
            this.pieOptions = this.options;
            this.getdata();
        },
        methods: {
            changed() {
                console.log("Message Updated ");
            },
            getdata() {
                var vm = this;
                var d = JSON.stringify(this.filters);
                axios({
                        method: 'post',
                        url: this.url ,
                        data: "filters=" + d
                    })
                    .then(function (response) {
                        console.log(response.data);

                       
                      
                        var s = jQuery.extend(true, {}, vm.pieOptions);
                      
                        //s.series = [];
                        s.series = response.data;
                        vm.pieOptions = s;
                        //vm.$eventHub.$emit('changeSeries', s);
                        //vm.options = vm.pieOptions;
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                },
        },
        watch: {
            high: function () {
                console.log("High Updated " + this.high);
                this.myhigh = this.high;

            },
            options: function () {
                console.log("Finally Options Updated " );
                this.pieOptions = this.options;
            },
            filters: function () {
                console.log("Filters Updated ");
                this.getdata();
            },
            width: function () {
                console.log("Width Updated " + this.width);
                this.mywidth = this.width;
            },
            type: function () {
                console.log("Width Updated " + this.width);
                this.mytype = this.type;
            },
            xAxis: function () {
                console.log("xAxis Updated " + this.xAxis);
                this.getdata();
            },
            yAxis: function () {
                console.log("xAxis Updated " + this.yAxis);
                this.getdata();
            },
            url: function () {
                console.log("xAxis Updated " + this.url);
                this.getdata();
            },
            msg: function () {
                console.log("Message Updated " + this.msg);

            },
        },


    });

//<select v-on: change="onchange">

//    @foreach (var item in Model)
//                        {
//        <option value="@item.Id">@item.Title</option>
//    }
//</select>

// pie chart data
