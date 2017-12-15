/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data() {
      return {
        leads: [],
        time_format: "12/25/17",
        url: "https://www.google.com/",
        search: '',
        key: '',
        reverse: 1
      };
    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        console.log(this);
        this.leads = response;
      }.bind(this));
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      sortAscDec: function(col) {
        this.key = col;
        if (this.reverse === 1) {
          this.leads = _.orderBy(this.leads, this.key);
          this.reverse *= -1;
        } else {
          this.leads = _.orderBy(this.leads, this.key, 'desc');
          this.reverse *= -1;
        }
      },
    },
    computed: {
      filteredLeads: function() {
            var search = this.search.toLowerCase();
            return this.leads.filter(
              function(lead){
                return lead.first_name.toLowerCase().includes(search) ||
                  lead.last_name.toLowerCase().includes(search) ||
                  lead.email.toLowerCase().includes(search);
              }
              );
      } 
    }

  });
})
