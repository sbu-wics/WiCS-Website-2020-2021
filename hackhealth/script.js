/* jshint strict: true  */
/* globals $ */

var API_HOST = function() {
    var host = window.location.host;
    if (host.indexOf('localhost') !== -1 || host.indexOf('127.0.0.1') !== -1) {
        return 'http://localhost:5000';
    }
    else {
        return 'https://hackhealth.herokuapp.com';
    }
}();

function setupForm($form, path, callback) {
    var options = {
        url: API_HOST + path,
        success: callback,
        beforeSubmit: function() { return $form.valid(); }
    };
    $form.ajaxForm(options);
    $form.validate({
        rules: {
            resume: {
                extension: 'pdf'

            }
        },
        messages: {
            resume:{
                required: "Select a PDF file"
            }
        }
    });
}

$(function() {
    $("a").smoothScroll({
        preventDefault: true,
        offset: -70  // to account for nav bar height + a little extra
    });

    setupForm($('.register-form'), '/register', function(response) {
        if (response.success) {
            $('#register-modal').modal('hide');
            $('#confirm-modal').modal();
        }
        else {
            var $error = $('#registration-error');
            $error.text(response.error);
            $error.css('display', 'block');
        }
    });

    // Wake up Heroku
    var image = new Image();
    image.src = API_HOST + '/pixel.gif';
});
