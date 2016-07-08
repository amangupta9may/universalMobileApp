/// <reference path="jquery-1.11.1.min.js" />
$(document).ready(function () {

});

function customCheckbox(checkboxName) {
    var checkBox = $('input[name="' + checkboxName + '"]');
    $(checkBox).each(function () {
        $(this).wrap("<span class='custom-checkbox'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });

    $(checkBox).click(function () {
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });

    $("#checkAll").change(function () {
        var checkBox = $('input[name="Accountname"]');
        $(checkBox).each(function () {
            if ($("#checkAll").is(':checked')) {
                changecolorbox();
                $(this).prop('checked', true);
                $(this).parent().removeClass("selected");
                $(this).parent().addClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
                $(this).parent().parent().addClass("labelselectedcheckbox");
                $(checkBox[checkBox.length-1]).parent().parent().addClass("labelselectedcheckbox");
            }

            else {
                $(this).prop('checked', false);
                $(this).parent().removeClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
                $(this).parent().parent().addClass("transparentbox");
                $(".transparentbox").css('background-color', 'transparent');
            }
        });
        forwardbutton();
    });

    $("#checkAll").click(function () {
        changecolorbox();
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });
}

$(document).ready(function () {
    customCheckbox("Accountname");
});

function clearcheckboxes() {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        $(this).prop('checked', false);
        $(this).parent().removeClass("selected");
        $(this).parent().parent().removeClass("labelselectedcheckbox");
        $(this).parent().parent().addClass("transparentbox");
        $(".transparentbox").css('background-color', 'transparent');
    });
}

function forwardbutton() {
    var checkBox = $('input[name="Accountname"]');
    var i = 0;
    $(checkBox).each(function () {
        if ($(this).is(':checked')) {
            i = i + 1;
        }
    });
    var themecode = window.localStorage.getItem("themecode");
    var colour;
    if (themecode === "1") {
        colour = '#E6CF8B';
    }
    else if (themecode === "2") {
        colour = '#DBC3D0';
    }
    else if (themecode === "3") {
        colour = '#98DAFC';
    }
    else {
        colour = '#C43235';
    }
    if (i == 0) {
        $(".btn").css({ 'background-color': '#dddddd' });
        $(".btn").prop("disabled", true);
    } else {
        $(".btn").css('background-color', colour );
        $(".btn").prop("disabled", false);
    }
}

function Checkboxstatechange(checkbox) {
    $(checkbox).parent().toggleClass("selected");
    if ($(checkbox).is(':checked')) {
        $(checkbox).prop('checked', true);
        $(checkbox).parent().addClass("selected");
        $(checkbox).parent().parent().addClass("labelselectedcheckbox");
    }
    else {
        if ($("#checkAll").is(':checked')) {
            $("#checkAll").prop('checked', false);
            $("#checkAll").parent().removeClass("selected");
            $("#checkAll").parent().parent().removeClass("labelselectedcheckbox");
        }
        $(checkbox).prop('checked', false);
        $(checkbox).parent().removeClass("selected");
        $(checkbox).parent().parent().removeClass("labelselectedcheckbox");
        $(checkbox).parent().parent().addClass("transparentbox");
        $(".transparentbox").css('background-color', 'transparent');
    }
}

function checkboxcheck(check) {
    var checkBox = $('input[name="Accountname"]');
    var i = 0;
    $(checkBox).each(function () {
        if ($(this).is(':checked')) {
            i = i + 1;
        } 
    });

    if (i > 4) {
        $(check).prop('checked', false);
        $(check).parent().removeClass("selected");
        $(check).parent().parent().removeClass("labelselectedcheckbox");
    }
}

function changecolorbox() {
    var themecode = window.localStorage.getItem("themecode");
    if (themecode === "1") {
        $(".labelselectedcheckbox").css("background-color", "#E6CF8B");
    } else if (themecode === "2") {
        $(".labelselectedcheckbox").css("background-color", "#DBC3D0");
    } else if (themecode === "3") {
        $(".labelselectedcheckbox").css("background-color", "#98DAFC");
    } else {
        $(".labelselectedcheckbox").css("background-color", "#C43235");
    }
}

function singleselectionchange(checkbox1) {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        if (!$(this).is(checkbox1)) {
            $(this).parent().removeClass("selected");
            $(this).parent().parent().removeClass("labelselectedcheckbox");
        }
        else {
            $(checkbox1).addClass("selected");
            $(checkbox1).parent().addClass("labelselectedcheckbox");
        }
    });
}

