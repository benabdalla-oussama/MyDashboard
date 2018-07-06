

Vue.component('pie_chart',
    {
        template: ` <div>
            <vue-highcharts :options="pieOptions"  :high="myhigh" :width="mywidth" ref="pieChart"></vue-highcharts>
    </div>
     `,
        props: ['title', 'xAxis', 'yAxis', 'detail', 'url', 'high', 'width', 'msg', 'options','filters'],

        data() {

            return {
                pieOptions: [],
                myhigh: 400,
                mywidth: 400
            }
        },
        mounted() {
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
                //axios({
                //        method: 'post',
                //        url: this.url + this.xAxis + "/" + this.yAxis,
                //        data: "filters=" + d
                //    })
                //    .then(function (response) {
                //        console.log(response.data);
                       
                //        let s = Object.assign({}, vm.pieOptions);
                //        //var s = PieData2.clone();
                //        s.series[0].data = response.data;
                //        vm.pieOptions = s;
                //    })
                //    .catch(function (error) {
                //        console.log(error);
                //    });

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
