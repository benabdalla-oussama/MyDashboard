Vue.component("settings",
    {
        template: ` <div :updated="updated" :chart="options" :is="value" > </div > `,
        props: ['type'],
        data() {

            return {
                value: "",
                options: Object,
                updated: false
            }
        },
        mounted() {
            this.value = this.type;
        }, 
        methods: {
            add: function (w) {
                console.log("this is settings");
                this.$emit('add');
                
            },
            changeSettings(content) {
                console.log("this is settings Update");
                console.log(content);
                this.update = true;
                this.options = content;
            },

        },
        watch: {
            type: function () {
                console.log("Type Updated "+this.type);
                this.value = this.type;
            }
        },

        created() {
           
            this.$eventHub.$on('chartSelected', this.changeSettings);

        }
    });
