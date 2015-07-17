/**
 * Created by alex on 14-10-15.
 */

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