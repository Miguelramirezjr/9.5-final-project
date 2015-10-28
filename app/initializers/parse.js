import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'D7H3Qc4xESJ3xjq4cMyC4IFT7yYbRuDYbRI2T2xN');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'vz4k4jXHCuwSsKwsYmbTq9KWM0RBR3veohAUCp8Z');
      if(localStorage.getItem('parse-session-token')) {
        xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
      }
    }
  }
});

$.getJSON('https://api.import.io/store/data/13f1c866-41fa-4a70-9fce-f6b3a241dcbb/_query?input/webpage/url=http%3A%2F%2Fwww.sneakerwatch.com%2Fchannel%2Frelease-dates%2F&_user=9cc15873-3754-455d-897c-db2d85143952&_apikey=9cc158733754455d897cdb2d8514395255f8429735755210302b74891db44c233c40ff87073cb6f7193d3e7615cf2d36b281818194f3c98b2fec9c9f72cb08f52394386c422b4b74584131f0612335c9').done(function(data) {

  $(data.results).each(function() {
    posts(this.my_column, this.my_column_link, this["my_column_2/_text"], '.uproxx');
  });
});
