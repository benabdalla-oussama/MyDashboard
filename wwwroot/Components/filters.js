Vue.component('filters',
    {
        template: ` <div>
                   
                    <template  v-for="(element, index) in filters">
                    <div class="alert alert-success alert-dismissable" style="margin:5px;">
                    <i class="fa fa-edit" style="font-size:32px;"></i> {{ element.attribute }}
                    </div>  
                    </template>
                    <div class="add-chip layout-row" layout="row">
                      <div  data-popup-open="popup-1" >
                       <img src="/img/addicon.png" width="30px" height="30px" />
                      <span class="btn btn-primary label ng-binding" color="blue">Ajouter un filtre</span>
                    </div>
                    </div> 
                    </div>`,

        data: function() {
            var mydata = {
               
                filters: [] ,
              
            }

            return mydata;
        },
        methods: {
          
            addFilter(index, item) {
                console.log("Chart[" + index + "] Filter = " + item);
                this.filters.push(item);
            },
            pusgFilter(item) {
                this.filters.push(item);
            }

        },

        created() {

           
            this.$eventHub.$on('add-filter', this.addFilter);
            this.$eventHub.$on('push-filter', this.pushFilter);


        }
    });

