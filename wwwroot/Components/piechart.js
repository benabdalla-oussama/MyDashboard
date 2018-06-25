

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
        props: ['title', 'axex', 'axey', 'detail', 'url', 'high', 'width', 'msg'],

        data() {

            return {
                pieOptions: PieData,
                myhigh: 400,
                mywidth: 400
            }
        },
        mounted() {

        }, 
        created: function() {
            console.log(this.title)
            console.log(this.url)
            PieData.title.text = this.title;
            PieData.series[0].name = this.detail;
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
                    url: $this.url + $this.axex + "/" + $this.axey,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {

                        console.log(data);
                        let s = Object.assign({}, PieData);
                        //var s = PieData.clone();
                        s.series[0].data = data;
                        $this.pieOptions = s;
                        // console.log(PieData);
                    }, //End of AJAX Success function

                    failure: function(data) {
                        alert("failure");
                        alert(data.responseText);
                    }, //End of AJAX failure function
                    error: function(data) {
                        alert("erreur");
                        alert(data.responseText);
                    } //End of AJAX error function

                });
            },
        },
        watch: {
                high: function() {
                    console.log("High Updated " + this.high);
                    this.myhigh = this.high;

                },
                width: function() {
                    console.log("Width Updated " + this.width);
                    this.mywidth = this.width;
                },
                axex: function() {
                    console.log("axex Updated " + this.axex);

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

var PieData = {

    chart: {
        type: 'pie',
        options3d: {
            enabled: false
        }
    },
    title: {
        text: 'Dashboard 1'
    },
    subtitle: {
        text: '3D donut in Highcharts'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: ' ',
        data: []
    }]
}