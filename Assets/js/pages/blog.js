



BlogNavSetSelected = function () {

    var param = getRouteUrlParameter('category');

    var pathname = location.pathname;

    var o;

    if (pathname == "/web/blog") {
        //all categories
        o = $('.blog_cate[data-cid=0]:first');

        $(o).addClass('active');

        //deselect others
        $('.blog_cate:not([data-cid=0])').each(function () {
            $(this).removeClass('active');
        });

        return false;
    }

    if (param) {
        //read path 1st
        o = $('.blog_cate[data-pathname=' + param + ']:first');
        if (!o || $(o).data('pathname') != param) {
            //path not found, read by id
            o = $('.blog_cate[data-cid=' + param + ']:first');
        }

        if (o) {
            $(o).addClass('active');

            //deselect others
            if (!isNaN(parseInt(param)) && param > 0) {
                $('.blog_cate:not([data-cid=' + param + '])').each(function () {
                    $(this).removeClass('active');
                });
            } else {
                $('.blog_cate:not([data-pathname=' + param + '])').each(function () {
                    $(this).removeClass('active');
                });
            }
        }
    }
};