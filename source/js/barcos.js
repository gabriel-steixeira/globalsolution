$(function () {
    function getContent(target) {
        window.on_page_functions = [];
        $.get(target + ".html").then(
            function (response) {
                $("#content-wrapper").html(response);

                window.on_page_functions.forEach(function (func) {
                    Metro.utils.exec(func, []);
                });
            }
        );
    }

    $(".barco").on(Metro.events.click, function (e) {
        debugger;
        var href = $(this).attr("href");
        var pane = $(this).closest(".navview-pane");
        var hash;

        if (Metro.utils.isValue(href) && href.indexOf(".html") > -1) {
            document.location.href = href;
            return false;
        }

        if (href === "#") {
            return false;
        }

        hash = href.substr(1);
        href = hash + ".html";

        getContent(hash);

        if (pane.hasClass("open")) {
            pane.removeClass("open");
        }

        pane.find("li").removeClass("active");
        $(this).closest("li").addClass("active");

        window.history.pushState(href, href, "index.html#" + hash);

        return false;
    });

});