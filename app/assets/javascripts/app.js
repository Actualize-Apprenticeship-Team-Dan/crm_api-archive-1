/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/"
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
      showEvents: function(lead) {
        if ($("#" + lead.id + "-events").length === 0) { 
          var eventsString = "";
          for (event of lead.events) {
            eventsString += "<p>" + event.name + "</p>";
          };
          var $row = $('#lead-' + lead.id);
          if (lead.events.length === 0) {
            var idString = '' + lead.id + '-events';
            var $newRow = $('<tr id=' + idString + '><td colspan="7">EVENTS: No Events</td></tr>');
          } else {
            var idString = '' + lead.id + '-events';
            var $newRow = $('<tr id=' + idString + '><td colspan="7">EVENTS: ' + eventsString + "</td></tr>");
          };
          $row.after($newRow);
        }
      }
    },
    computed: {

    },
  });
});
