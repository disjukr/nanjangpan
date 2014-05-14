function layout() {
    var $window = $(window);
    var $viewport = $(viewport);
    var $left_sidebar = $('.left.side-bar');
    $viewport.css('left', $left_sidebar.width());
    $viewport.width(function () {
        return $window.width() - $left_sidebar.width();
    });
}
layout();
$(window).resize(layout);
