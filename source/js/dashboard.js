$(function () {
    var hash = location.hash;
    var target = hash.length > 0 ? hash.substr(1) : "dashboard";
    var link = $(".navview-menu2 a[href*=" + target + "]");
    var menu = link.closest("ul[data-role=dropdown]");
    var node = link.parent("li").addClass("active");

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

    if (menu.length > 0) {
        Metro.getPlugin(menu, "dropdown").open();
    }

    $(".navview-menu2").on(Metro.events.click, "a", function (e) {
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