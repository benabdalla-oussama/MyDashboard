
Vue.component('filter-settings',
    {
        template: `    
   <div class="popup" data-popup="popup-1">
        <div class="popup-inner">
            <h2>Create Filter</h2>
                             <div class="row form-group filterDiv" >
                               <div class="form-group col-md-3 ">
                                    
                                        <select id="attributes" class="form-control" v-on:change="attributeSelected()" v-model="attribute"  >
                                            <option value="" disabled selected>Select an attribute</option>
                                            <template  v-for="(element, index) in attr">
                                            <option  :value="index">{{ element.name }}</option>
                                            < /template>
                                        </select>
                                        <div class="form-control-focus"> </div>
                                       
                                   
                                </div>

                                <div class="form-group col-md-3 ">
                                                                      
                                        <select id="filters" class="form-control" v-on:change="filterSelected()" v-model="filter"   >
                                            <option value="" disabled selected>Select a filter</option>
                                            <template  v-for="(element, index) in filters">
                                            <option  :value="index">{{ element.name }}</option>
                                            < /template>
                                        </select>
                                        <div class="form-control-focus"> </div>
                                    
                                   
                                </div>

                                <div id="paramDiv1" class="form-group col-md-3 "  :style="{ display:'none'}">    
                                    <input id="param1" type="text" class="form-control" placeholder="Enter Param 1">
                                </div>
                                <div  id="paramDiv2" class="form-group col-md-3 "  :style="{ display:'none'}">
                                    <input id="param2" type="text" class="form-control" placeholder="Enter Param 2">
                                </div>
                           </div>
                    </br>
            <div  class="col-md-offset-2 col-md-10">
                <button type="button" data-popup-close="popup-1"  class="btn default">Cancel</button>
                <button type="button" v-on:click="save()" class="btn blue">Submit</button>
            </div>
            <a class="popup-close" data-popup-close="popup-1" href="#">x</a>
        </div>
    </div> ` ,
        data: function () {
            var mydata = {
                msg: "Message",
                attr: [],
                filters: [],
                attribute: "",
                filter: "",
                chartIndex : -1
            }

            return mydata;
        },
        mounted() {
            this.getdata();
        },
        created() {
            this.$eventHub.$on('createFilter', this.select);

        },
        methods: {
            save() {
                var param1 = $("#param1").val();;
                if ((this.chartIndex != -1)&&(param1 != "")) {
                    var selectedAttribute = this.attr[this.attribute];
                    var myfilter = selectedAttribute.filters[this.filter];
                   
                    var param2 = $("#param2").val();;
                    this.$eventHub.$emit('add-filter', this.chartIndex,
                        {
                            attribute: selectedAttribute.name ,
                            filter: myfilter.name,
                            paramsNumber: selectedAttribute.paramsNumber,
                            param1: param1,
                            param2: param2

                        });
                }
            },
            select(index) {
                this.chartIndex = index;
                console.log("c'est bon "+this.chartIndex);
            },
            attributeSelected() {
                console.log("Select Changed" + this.attribute);
                this.filters = [];
                var selectedAttribute = this.attr[this.attribute];
                for (var index in selectedAttribute.filters) {
                    var att = selectedAttribute.filters[index];
                    this.filters.push(att);
                }
                $("#param1").val("");
                $("#param2").val("");
                $("#paramDiv1").css("display", "none");
                $("#paramDiv2").css("display", "none");
            },
            filterSelected() {
                console.log("Select Changed" + this.filter);
                $("#param1").val("");
                $("#param2").val("");
                $("#paramDiv1").css("display", "block");

                var selectedAttribute = this.attr[this.attribute];
                var myfilter = selectedAttribute.filters[this.filter];
                if (myfilter.paramsNumber == 2)
                    $("#paramDiv2").css("display", "block");
                else
                    $("#paramDiv2").css("display", "none");
            },
            addAttribute(att) {
                this.attr.push(att);
            },
            getdata() {
                var cm = this;
                axios.get('getAttributes/')
                    .then(function (response) {
                        // handle success
                        console.log(response.data);
                        for (var index in response.data) {
                            var att = response.data[index];
                            cm.addAttribute(att);
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });




            }
        }
    });