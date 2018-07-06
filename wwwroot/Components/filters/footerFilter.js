Vue.component('test',
    {
        template: ` <div class="popup" data-popup="popup-1">
        <div class="popup-inner">
            <h2>Create Filter</h2>
                  
                               <div class="form-group form-md-line-input has-success">
                                    <label class="col-md-3 control-label" for="form_control_1">Attribute</label>
                                    <div class="col-md-3">
                                        <select id="data" class="form-control" v-on:change="attributeSelected()" v-model="attribute"  >
                                            <template  v-for="(element, index) in attr">
                                            <option  :value="index">{{ element.name }}</option>
                                            < /template>
                                        </select>
                                        <div class="form-control-focus"> </div>
                                        <span class="help-block">Choose an attribute...</span>
                                    </div>
                                </div>
                    </br>
            <div  class="col-md-offset-2 col-md-10">
                <button type="button" data-popup-close="popup-1"  class="btn default">Cancel</button>
                <button type="button" class="btn blue">Submit</button>
            </div>
            <a class="popup-close" data-popup-close="popup-1" href="#">x</a>
        </div>
    </div> `,
        data: function() {
            var mydata = {
                msg: "Message",
                attr: []

            }

            return mydata;
        },
        mounted() {
            this.getdata();
        },
        methods: {
            attributeSelected() {

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