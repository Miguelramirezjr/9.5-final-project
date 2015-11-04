import $ from 'jquery';

$.ajaxSetup({
    beforeSend(xhr, options) {
        console.log(xhr);
        console.log(options);
        if(options.url.match(/api.parse.com/)) {

            xhr.setRequestHeader('X-Parse-Application-Id', 'D7H3Qc4xESJ3xjq4cMyC4IFT7yYbRuDYbRI2T2xN');
            xhr.setRequestHeader('X-Parse-REST-API-Key', 'vz4k4jXHCuwSsKwsYmbTq9KWM0RBR3veohAUCp8Z');

            if(localStorage.getItem('parse-session-token')) {
                xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
            }
        }
    }
});
