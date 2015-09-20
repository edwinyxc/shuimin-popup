//popup.js
function Popup(template) {
    var tmpl_url = template;

    var options = {
        scrollbars: 'yes',
        resizable : 'yes',
        menubar   : 'no',
        titlebar  : 'no',
        location  : 'no',
        toolbar   : 'no',

        height: 400,
        width : 500,
        top   : 200,
        left  : 200
    };

    this.option = function () {
        if (arguments.length < 1) {
            return this;
        }
        else if (arguments.length === 1) {
            var arg = arguments[0];
            if (typeof(arg) === 'object') {
                Object.assign(options, arg);
            }
            return this;
        }
        else {
            options[arguments[0]] = arguments[1];
            return this;
        }
    };

    //events
    var on = {

        close: function () {
            console.debug('empty on_close called');
        }

        /*open: function(){
         console.debug('empty on_open called');
         },*/

    };

    this.on = function (name, fn) {
        on[name] = fn;
        return this;
    };

    var window_popup;
    var origin_close;
    this.open = function (title) {

        function build_option_string() {

            return "scrollbars=" + options.scrollbars +
                ",resizable=" + options.resizable +
                ",menubar=" + options.menubar +
                ",titlebar=" + options.titlebar +
                ", location =" + options.location +
                ", toolbar =" + options.toolbar +
                ", top =" + options.top +
                ", left =" + options.left +
                ", width =" + options.width +
                ", height =" + options.height +
                "";
        }

        (on['open'] || function () { })();
        window_popup = window.open(tmpl_url, title, build_option_string());
        //save origin
        origin_close = window_popup.close;
        window_popup.close = this.close;
        return this;
    };

    this.close = function () {
        var before = (on['close'] || function () {});
        before.apply(this, arguments);
        origin_close.apply(this);
    }
}


module.exports = function(template){
    return new Popup(template);
};
