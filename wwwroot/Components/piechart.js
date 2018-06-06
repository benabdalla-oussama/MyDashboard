

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
    template: `    <div class="charts col-md-6">
        <div class="portlet light portlet-fit bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class=" icon-layers font-green"></i>
                    <span class="caption-subject font-green bold uppercase">Donut Chart</span>
                </div>
                <div class="actions">
                    <select v-on: change="onchange">

                        @foreach (var item in Model)
                        {
                        <option value="@item.Id">@item.Title</option>
                    }
                    </select>
                <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                    <i class="icon-cloud-upload"></i>
                </a>
                <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                    <i class="icon-wrench"></i>
                </a>
                <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                    <i class="icon-trash"></i>
                </a>
            </div>
        </div>
        <div class="portlet-body">
            <vue-highcharts : options="pieOptions" ref="pieChart"></vue-highcharts>
    </div>
        </div>
    </div >`,
    props: ['title', 'axex', 'axey', 'detail', 'url'],

    data() {

        return {
            pieOptions: PieData
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

            var piecharts = @JavaScriptConvert.SerializeObject(Model);

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

});

