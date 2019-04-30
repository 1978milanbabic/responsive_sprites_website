//login check script
(function (win) {
    if (!checkLog()) {
        win.location.replace("./errlogin");
    }
})(window);

//display result
(function ($, doc) {
    $(doc).ready(function () {

        $.get("./createdsprites/stylesheets/sprite.json",
            function (data) {
                $("textarea").empty();
                var cont = $(".jsonobj");

                var var_spritename = "pngs_data";
                var cssclass = "sprites";
                var picname = "sprite.png";
                var img_source = "./img/" + picname;

                var _tab = "&#9;";
                var _nl = "\n";

                cont.append('var ' + var_spritename + ' = {' + _nl);
                cont.append('' + _tab + 'cssclass: "' + cssclass + '",' + _nl);
                cont.append('' + _tab + 'img_source: "' + img_source + '",' + _nl);



                var nmbofpics = Object.keys(data).length;
                var picscount = 0, comm = ",";
                var firstelem = true;
                for (var key in data) {
                    picscount++;
                    if (picscount == nmbofpics) {
                        comm = "";
                    }

                    if (firstelem) {
                        firstelem = false;

                        var tot_width;
                        var tot_height;

                        cont.append('' + _tab + 'total_width: ' + data[key]["total_width"] + ',' + _nl);
                        cont.append('' + _tab + 'total_height: ' + data[key]["total_height"] + ',' + _nl);

                        cont.append('' + _tab + 'imgs: {' + '' + _nl);
                    }

                    cont.append('' + _tab + _tab + '"' + key + '": ' + '{' + _nl);

                    var comma_counts = 0, comma = ",";
                    for (var key2 in data[key]) {
                        if (key2 == "x" || key2 == "y" || key2 == "width" || key2 == "height") {
                            comma_counts++;
                            if (comma_counts > 3) {
                                comma = "";
                            }
                            cont.append('' + _tab + _tab + _tab + key2 + ' : ' + data[key][key2] + comma + '' + _nl);
                        }
                    }
                    cont.append('' + _tab + _tab + '}' + comm + '' + _nl);
                }

                cont.append('' + _tab + '}' + comm + '' + _nl);

                cont.append('};');
            }
        );

    });
})(jQuery, document);

//back button to anull previous creations
(function (win) {
    var targetLocation = function () {
        var url = './createsprites';
        win.history && win.history.pushState && win.history.pushState(null, null, win.location);
        win.addEventListener && win.addEventListener('popstate', function () {
            win.location = url;
        }, !1)
    };
    (function () {
        if (win.addEventListener) {
            win.addEventListener('pageshow', function () {
                setTimeout(targetLocation, 0);
            }, !1)
        } else {
            setTimeout(targetLocation, 0);
        }
    }())
}(window));
