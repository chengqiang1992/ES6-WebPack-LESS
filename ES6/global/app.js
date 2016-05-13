var App = function () {

    var sayHello = function () {
        alert("Hello");
    };

    return {
        init: function () {
            sayHello();
        },
        alert: function (options) {
            options = $.extend(true, {
                container: "",          //alerts parent container(by default placed after the page breadcrumbs)  
                place: "append",        // "append" or "prepend" in container 
                type: "success",        // alert's type
                message: "",            // alert's message
                close: true,            // make alert closable
                reset: true,            // close all previouse alerts first
                focues: true,           // auto scroll to the alert after shown
                closeInSeconds: 0,      // auto close after defined seconds
                icon: ""                 // put icon before the message
            }, options);

            var id = App.getUniqueID("App_alert");

            var html = '<div id="' + id + '" class="custom-alerts alert alert-' + options.type + ' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '') + (options.icon !== "" ? '<i class="fa-lg fa fa-' + options.icon + '"></i>  ' : '') + options.message + '</div>';
            if (options.reset) {
                $('.custom-alerts').remove();
            }

            if (!options.container) {
                if ($('body').hasClass("page-container-bg-solid") || $('body').hasClass("page-content-white")) {
                    $('.page-title').after(html);
                } else {
                    if ($('.page-bar').size() > 0) {
                        $('.page-bar').after(html);
                    } else {
                        $('.page-breadcrumb').after(html);
                    }
                }
            } else {
                if (options.place == "append") {
                    $(options.container).append(html);
                } else {
                    $(options.container).prepend(html);
                }
            }

            if (options.focus) {
                App.scrollTo($('#' + id));
            }

            if (options.closeInSeconds > 0) {
                setTimeout(function () {
                    $('#' + id).remove();
                }, options.closeInSeconds * 1000);
            }

            return id;
        },

        getURLParameter: function (paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");
            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    //decodeURI
                    //decodeURIComponent
                    return val[1];
                }
            }
            return null;
        },

        getUniqueID: function (prefix) {
            return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
        }
    }
}();

jQuery(document).ready(function () {
    App.init();
    alert(App.alert("Hello World"));
    alert(App.getURLParameter("ID"));
    alert(App.getUniqueID("123"));
});