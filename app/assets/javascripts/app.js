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
        var $eventRow = $("#" + lead.id + "-events");  //creates a string with a lead id.
        if ($eventRow.length === 0) { 
          var eventsString = "";
          for (event of lead.events) {
            eventsString += '<div class="row">';
            eventsString += '<div class="col-md-2">' + event.name + '</div>';
            eventsString += '<div class="col-md-4">' + this.moment(event.created_at).format('dddd MMM Do YYYY, h:mm a') + '</div>';
            eventsString += '</div>';
          };                                  // this loop double checks whether or not the event exists already, if it doesn't it will create a string into the html.
          var $row = $('#lead-' + lead.id);
          if (lead.events.length === 0) {
            var idString = '' + lead.id + '-events';
            var $newRow = $('<tr id=' + idString + '><td colspan="7">EVENTS: No Events</td></tr>');
          } else {
            var idString = '' + lead.id + '-events';
            var $newRow = $('<tr id=' + idString + '><td colspan="7">' + eventsString + "</td></tr>");
          };                    // no events == no events
          $row.after($newRow);
        } else {
          $eventRow.remove(); // if events row exists then remove tho row(toggle). 
        }
      }
    },
    computed: {

    },
  });
});
