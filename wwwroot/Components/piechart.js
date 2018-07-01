

$(function () {
    $(".charts").resizable({ grid: 10 });
    $(".charts").draggable();
    $("#droppable").droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        }
    });
});

Vue.component('pie_chart',
    {
        template: ` <div>
            <vue-highcharts :options="pieOptions"  :high="myhigh" :width="mywidth" ref="pieChart"></vue-highcharts>
    </div>
     `,
        props: ['title', 'xAxis', 'yAxis', 'detail', 'url', 'high', 'width', 'msg', 'options'],

        data() {

            return {
                pieOptions: PieData2,
                myhigh: 400,
                mywidth: 400
            }
        },
        mounted() {

        },
        created: function () {
            this.pieOptions = this.options;

            this.getdata();

        },
        methods: {
            changed() {
                console.log("Messasddsqfdsgdsgsge Updated ");
            },
            getdata() {
                $this = this;
                $.ajax({
                    type: "GET",
                    url: $this.url + $this.xAxis + "/" + $this.yAxis,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        console.log(data);
                        let s = Object.assign({}, $this.pieOptions);
                        //var s = PieData2.clone();
                        s.series[0].data = data;
                        $this.pieOptions = s;
                        // console.log(PieData2);
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
            width: function () {
                console.log("Width Updated " + this.width);
                this.mywidth = this.width;
            },
            xAxis: function () {
                console.log("xAxis Updated " + this.xAxis);

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
var PieData2 = {

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
        name: ' ',
        data: []
    }]
}