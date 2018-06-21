

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


Vue.component('pie_chart', {
    template: ` <div>
            <vue-highcharts :options="pieOptions"  :high="myhigh" :width="mywidth" ref="pieChart"></vue-highcharts>
    </div>
     `,
    props: ['title', 'axex', 'axey', 'detail', 'url','high','width'],

    data() {

        return {
            pieOptions: PieData,
            myhigh: 400,
            mywidth: 400
        }
    },
    mounted() {
        
    },
    created: function () {
        console.log(this.title)
        console.log(this.url)
        PieData.title.text = this.title;
        PieData.series[0].name = this.detail;
        this.getdata();
     
    },
    methods: {

        getdata() {
            $this = this;
            $.ajax({
                type: "GET",
                url: $this.url + $this.axex + "/" + $this.axey,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    //console.log(data);
                    let s = Object.assign({}, PieData);
                    //var s = PieData.clone();
                    s.series[0].data = data;
                    $this.pieOptions = s;
                    // console.log(PieData);
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
        onchange: function (e) {

           // var piecharts = @JavaScriptConvert.SerializeObject(Model);
            var piecharts;
            var pirchart = piecharts.filter(function (item) {
                return item.id == e.target.value;
            });
            console.log(pirchart);
            this.title = pirchart[0].title;
            this.detail = pirchart[0].detail;
            this.url = pirchart[0].url;
            this.axex = pirchart[0].xAxis;
            this.axey = pirchart[0].yAxis;

            PieData.title.text = this.title;
            PieData.series[0].name = this.detail;
            this.getdata();
        }

    },
    watch: {
   
        high: function () {
            console.log("High Updated "+this.high);
            this.myhigh = this.high;
           
        },
        width: function () {
            console.log("Width Updated " + this.width);
            this.mywidth = this.width;
        },
    },

});

//<select v-on: change="onchange">

//    @foreach (var item in Model)
//                        {
//        <option value="@item.Id">@item.Title</option>
//    }
//</select>

