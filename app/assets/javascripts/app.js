/* global Vue */
Vue.config.delimiters = ['@{', '}'];
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data() {
      return {
        leads: [],
        time_format: "12/25/17",
        url: "https://www.google.com/",
        search: '',
        reverse: 1,
      };
    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        console.log(this);
        this.leads = response;
        this.leads.map(function(lead){
          app.$set(lead, 'showEvents', false);
        });
      }.bind(this));
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      sortAscDec: function(col) {
        if (this.reverse === 1) {
          this.leads = _.orderBy(this.leads, col);
          this.reverse *= -1;
        } else {
          this.leads = _.orderBy(this.leads, col, 'desc');
          this.reverse *= -1;
        }
      },
      rowColor: function(lead){
        
        if (!lead.outreaches.length){
          return 'background-color:orange';
        }

        var latestEventDate = _
          .chain(lead.events)
          .orderBy('updated_at', ['desc'])
          .head()
          .value()
          .updated_at;

        var latestOutreachDate = _
          .chain(lead.outreaches)
          .orderBy('updated_at', ['desc'])
          .head()
          .value()
          .updated_at;

        if (latestEventDate > latestOutreachDate) {
          return 'background-color:#0cc6f4;';
        } else {
          return '';
        }
      }
    },
    computed: {
      filteredLeads: function() {
        //removing any additional event 
        $('.event-row').remove(); 
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
