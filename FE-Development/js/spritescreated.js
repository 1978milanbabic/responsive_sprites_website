//login check script
(function (win) {
    function checkData() {
        var tryName = getCookie("data");
        if (tryName && tryName != "" && tryName != "undefined" && tryName != null) {
            return true;
        } else {
            return false;
        }
    }

    if (!checkLog()) {
        win.location.replace("./errlogin");
    }

    if (!checkData()) {
        win.location.replace("./");
    } else {
        var datCVal = getCookie("data");
        setCookie("data", datCVal, 12);
    }
})(window);

//display result
(function ($, doc) {
    $(doc).ready(function () {

        //get data Cookie vals
        var dataVals = JSON.parse(unescape(getCookie("data")));
        //development!!!
        console.log(dataVals);

        $("#spriteimg").attr("src", "/uploads/" + unescape(userNameCookie) + "/createdsprites/" + dataVals.imgName + "." + dataVals.picType);

        $.get(jsonsrc,
            function (data) {

                $("textarea").empty();
                var cont = $(".jsonobj");

                var var_spritename = "pngs_data";
                var cssclass = dataVals.className;
                var picname = dataVals.imgName + "." + dataVals.picType;
                var img_source = dataVals.folder + picname;

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

                //delete cookie data
                setCookie("data", "", -13);
            }
        );

    });
})(jQuery, document);
