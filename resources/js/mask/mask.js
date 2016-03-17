/**
 * Created by alex on 14-10-15.
 */

<!--loading遮蔽层-->
var spinner;

function showMask() {
    var getTarget = function () {
        var target = document.getElementById("spin");
        if (!target) {
            target = document.createElement("div");
            target.id = "spin"
            document.body.appendChild(target);
        }
        return target;
    }

    if (!spinner) {
        spinner = new Spinner({
            lines: 10, // The number of lines to draw
            length: 8, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circlew
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: "30%", // Top position relative to parent in px
            left: "50%"  // Left position relative to parent in px
        });
    }
    spinner.spin(getTarget());
}

function hideMask() {
    if (document.getElementById("spin"))
        document.body.removeChild(document.getElementById("spin"));
    spinner.stop();
}
<!--loading遮蔽层 end-->

<!--半透明遮蔽层-->
var Mask = function (parent) {
    this.count = 0;
    this._body = parent;
}

Mask.prototype.show = function () {
    var _mask = $('<div id="mask" style="width: 100%;z-index: 9;opacity: 0.4;position: absolute;top: 0;left:0;background-color: #cccccc"></div>');
    if (this.count == 0) {
        $(_mask).css('height', window.outerHeight * 5);
        $(this._body).append(_mask);
    }
    this.count++;
};
Mask.prototype.hide = function () {
    if (--this.count <= 0) {
        this.count = 0;
        $('#mask').remove();
    }
};
<!--半透明遮蔽层 end-->