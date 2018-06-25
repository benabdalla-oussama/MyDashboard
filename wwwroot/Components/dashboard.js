
var Events = new Vue({});
Vue.component('dashboard',
    {
        template: `  <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-gift"></i>My Dashboard
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                                <a href="#portlet-config" data-toggle="modal" class="config"> </a>
                                <a href="javascript:;" class="reload"> </a>
                                <a href="javascript:;" class="remove"> </a>
                            </div>
                        </div>
                           

                        <div id="dashboard1" style="height: 1000px;" class="portlet-body form">

                            
                                <template v-for="(element, index) in charts">
                                <draggpable :parent="true" v-on:resize="resize" :resizable="true" :h="element.high" :w="element.width" :elementx="element.elementx" :elementy="element.elementy" :index="index" :x="element.x" :y="element.y" style="border: 1px solid; border-color: #64B5F6">

                                    <pie_chart  :msg="msg" :axex="element.axex" :high="element.high" :width="element.width" :axey="element.axey" :title="element.title" :url="element.url" :detail="element.detail"></pie_chart>
                                
                                </draggpable>
                                </template>
                            

                        </div>
                    </div> ` ,
        data: function () {
            var mydata = {
                donnees: Object,
                titre: 'Title1',
                charts: [],
                msg: 'message',
                minimized: false,
                mobileOpen: false

            }

            return mydata;
        },
        methods: {

            resize: function (w, h, i) {
                
                console.log("resize from "+this.charts[i].axex );
                this.charts[i].high = h - 5;
                this.charts[i].width = w - 5;
                this.charts[i].axex = "gggggggg";
                this.msg = "Message Updated";
                console.log(" To " + this.msg );
               
            },
           
            firstLinkClick() {
                alert('Hey you clicked me!')
            },
            toggleSideBar() {
                this.minimized = !this.minimized
            },
            openMobileMenu() {
                this.mobileOpen = !this.mobileOpen
            },
            clear() {
                this.charts = [];
            },
            add() {
                var x = $("#dashboard1").position();
                var newchart = {

                    axex: "Name",
                    axey: "Sales",
                    title: "Sales per Country",
                    url: "getData/",
                    detail: "Sales amount",
                    high: 300,
                    width: 300,
                    x: x.left,
                    y: x.top,
                    elementx: x.left,
                    elementy: x.top
                }

                this.charts.push(newchart);
            },
            additem(item) {
                var x = $("#dashboard1").position();
                var newchart = {

                    axex: item.xAxis,
                    axey: item.yAxis,
                    title: item.title,
                    url: item.url,
                    detail: item.detail,
                    high: item.high,
                    width: item.width,
                    x: x.left,
                    y: x.top,
                    elementx: item.x,
                    elementy: item.y
                }
                console.log(newchart);
                this.charts.push(newchart);
            }

        }
    })