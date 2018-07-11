
var Events = new Vue({});
Vue.component('dashboard',
    {
        template: `  

                        <div id="dashboard1" style="height: 1000px;" class="diagramDiv">
                                
                               <h2 align="center"  style="padding: 10px; color:#0c61d1;">My Dashboard</h2>
                                <template  v-for="(element, index) in charts">
                              
                                <draggpable :parent="true" v-on:resize="resize" :resizable="true" :h="element.high" :w="element.width" :elementx="element.elementx" :elementy="element.elementy" :index="index" :x="element.x" :y="element.y" style="border: 2px solid; border-color: #64B5F6">
                                    <div v-on:click="select(index)">
                                        <chart :filters="element.filters" :options="element.options" :msg="msg" :xAxis="element.xAxis" :high="element.high" :width="element.width" :type="element.type" :yAxis="element.yAxis" :title="element.title" :url="element.url" :detail="element.detail"></chart>
                                    </div>
                                </draggpable>
                            
                                </template>
                            

                        </div>
                    </div> `,
        data: function() {
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
            resize: function( w,h, i) {

                console.log("resize from " + this.charts[i].xAxis);
                this.charts[i].high = h ;
                this.charts[i].width = w ;
                this.msg = "Message Updated";
                console.log(" To " + this.msg);
                this.charts[i].updated = true;

            },
            ChartResized (i,x1, y1) {

                console.log("ChartResized from "+x1+" : "+y1);
                this.charts[i].elementx = x1;
                this.charts[i].elementy = y1;
                
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
               
                    while (this.charts.length !== 0) {
                        this.charts.shift();
                    }
                
            },
            changeChart(content) {

                console.log(content);
                content.url = content.options.dataconfig.url;
                content.xAxis = content.options.dataconfig.xAxis;
                content.yAxis = content.options.dataconfig.yAxis;
                content.title = content.options.dataconfig.title;
                console.log("Chart Updated");
                console.log(content);
                this.$set(this.charts, content.index, content);
                // this.charts[content.index] = content;

                //console.log(this.charts[content.index]);                                      $this.dashboards.push(attr);

            },
            select(index) {

                console.log(index);
                //this.charts.splice(index, 1);
                var chart = jQuery.extend(true, {}, this.charts[index]);

                chart.index = index;
                this.$eventHub.$emit('chartSelected', chart);
                this.$eventHub.$emit('createFilter', index);

            },
            deleteChart(index) {

                console.log(index);
                this.charts.splice(index, 1);

            },
            add(chartOptions) {
                var x = $("#dashboard1").position();
                var newchart = {
                    id: -1,
                    type: chartOptions.chart.type,
                    xAxis: chartOptions.dataconfig.xAxis,
                    yAxis: chartOptions.dataconfig.yAxis,
                    title: chartOptions.dataconfig.title,
                    url: chartOptions.dataconfig.url,
                    detail: "Sales amount",
                    high: 400,
                    width: 400,
                    x: x.left,
                    y: x.top,
                    elementx: x.left,
                    elementy: x.top,
                    options: chartOptions,
                    filters: [],
                    dashboard : Object
                }
                console.log("Add Chart");
                console.log(newchart);
                this.charts.push(newchart);
            },
            saveDashboard(element) {
                for (var index in this.charts) {
                    this.charts[index].dashboard = element;
                }

                var mycharts = jQuery.extend(true, {}, this.charts);
                var mydash = jQuery.extend(true, {}, element);

                for (var index in mycharts) {
                    mycharts[index].x = mycharts[index].elementx;
                    mycharts[index].y = mycharts[index].elementy;
                    var optionss = JSON.stringify(mycharts[index].options);
                    var filterss = JSON.stringify(mycharts[index].filters);
                    mycharts[index].options = optionss;
                    mycharts[index].filters = filterss;
                }
                mydash.piecharts = [];
                for (var index in mycharts) {
                    mydash.piecharts.push(mycharts[index]);
                }
                var uri = 'api/Dashboards';
                var d = JSON.stringify({
                    "id": mydash.id,
                    "title": mydash.title,
                    "date": mydash.date,
                    "piecharts": mydash.piecharts
                });
                console.log(d)

                axios({
                    method: 'post',
                    url: uri,
                    data: "dashboard="+ d
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                //axios.post(uri, { body: mydash }).then((response) => {
                //    console.log(response);
                //});
            },
            additem(item) {
                var x = $("#dashboard1").position();
                var newchart = {
                    id: item.id,
                    type: item.type,
                    xAxis: item.xAxis,
                    yAxis: item.yAxis,
                    title: item.title,
                    url: item.url,
                    detail: item.detail,
                    high: item.width ,
                    width: item.high ,
                    x: x.left,
                    y: x.top,
                    elementx: item.x,
                    elementy: item.y,
                    filters: JSON.parse(item.filters),
                    options: JSON.parse(item.options),
                    dashboard: Object
                }
                console.log(newchart);
                this.charts.push(newchart);
            },
            refresh() {
                for (var index in this.charts) {
                    this.resize(this.charts[index].width, this.charts[index].high, index);
                    this.ChartResized(index, this.charts[index].elementx, this.charts[index].elementy)
                }
            },
            addFilter(index, item) {
                console.log("Chart[" + index + "] Filter = " + item);
                this.charts[index].filters.push(item);
            }

        },

        created() {

            console.log('Dashboard Created');
            this.$eventHub.$on('change-chart', this.changeChart);
            this.$eventHub.$on('deleteChart', this.deleteChart);
            this.$eventHub.$on('add-filter', this.addFilter);
            this.$eventHub.$on('ChartResized', this.ChartResized);


        }
    });