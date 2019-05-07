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

        //set html folder data
        $("#foldername").html(dataVals.folder);

        $("#spriteimg").attr("src", "/uploads/" + unescape(userNameCookie) + "/createdsprites/" + dataVals.imgName + "." + dataVals.picType);

        $.get(jsonsrc,
            function (data) {

                $("textarea").empty();
                var cont = $(".jsonobj");
                var imgVar = [];
                imgVar.__proto__.append = function (args) { this.push(args) };

                var var_spritename = "pngs_data";
                var cssclass = dataVals.className;
                var picname = dataVals.imgName + "." + dataVals.picType;
                var img_source = dataVals.folder + picname;

                var $table = $("table");

                var _tab = "";      // &#9;
                var _nl = "";       // \n
                var $_tab = "&#9;";
                var $_nl = "\n";

                // imgVar.append('var ' + var_spritename + ' = {' + _nl);
                imgVar.append('' + _tab + 'cssclass: "' + cssclass + '",' + _nl);
                imgVar.append('' + _tab + 'img_source: "' + img_source + '",' + _nl);


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

                        imgVar.append('' + _tab + 'total_width: ' + data[key]["total_width"] + ',' + _nl);
                        imgVar.append('' + _tab + 'total_height: ' + data[key]["total_height"] + ',' + _nl);

                        imgVar.append('' + _tab + 'imgs: {' + '' + _nl);
                    }

                    imgVar.append('' + _tab + _tab + '"' + key + '": ' + '{' + _nl);

                    var comma_counts = 0, comma = ",";
                    for (var key2 in data[key]) {
                        if (key2 == "x" || key2 == "y" || key2 == "width" || key2 == "height") {
                            comma_counts++;
                            if (comma_counts > 3) {
                                comma = "";
                            }
                            imgVar.append('' + _tab + _tab + _tab + key2 + ' : ' + data[key][key2] + comma + '' + _nl);
                        }
                    }
                    imgVar.append('' + _tab + _tab + '}' + comm + '' + _nl);

                    //add User Helper Table Rows
                    var dataRow = $("<tr>");

                    //info cell
                    var dataCinfo = $("<td>", {
                        addClass: "sinfo"
                    });
                    var infoInput = $("<input>", {
                        attr: {
                            type: "text",
                            name: "i",
                            value: '<i class="' + cssclass + "-" + key + '"></i>'
                        }
                    });
                    dataCinfo.append(infoInput);
                    dataRow.append(dataCinfo);
                    //scheck cell
                    var scheckCell = $("<td>", {
                        addClass: "scheck"
                    });
                    var sccBox = $("<a>", {
                        attr: {
                            href: "#"
                        },
                        html: "COPY",
                        click: function (event) {
                            event.preventDefault();
                            //copy input
                            var $this = $(this);
                            var $input = $this.parent().parent().find(".sinfo input");
                            $input.select();
                            document.execCommand("copy");
                            //change check
                            var $checkCell = $this.parent().parent().find(".schecked");
                            $checkCell.addClass("checked");
                            var $check = $checkCell.find("input");
                            $check.prop('checked', true).change();
                        }
                    });
                    scheckCell.append(sccBox);
                    dataRow.append(scheckCell);
                    //schecked cell
                    var scheckedCell = $("<td>", {
                        addClass: "schecked"
                    });
                    var scInput = $("<input>", {
                        attr: {
                            type: "checkbox",
                            name: "c"
                        },
                        click: function () {
                            var $this = $(this);
                            $this.attr('checked', false);
                            //remove show class
                            $this.parent().removeClass("checked");
                        }
                    });
                    var scSpan = $("<span>", {
                        html: "Used!"
                    });
                    scheckedCell.append(scInput).append(scSpan);
                    dataRow.append(scheckedCell);

                    //append to table
                    $table.append(dataRow);

                }

                imgVar.append('' + _tab + '}' + comm + '' + _nl);

                imgVar.append('}');

                //imgVar created!
                imgVar = imgVar.join("");

                //insert imgVar into framework
                var fWork = "<script>" + $_nl + "/**" + $_nl + "* Responsive Sprites Framework" + $_nl + "* Copyright 2019 Milan Babic https://www.linkedin.com/in/milanbabic1978/" + $_nl + "* Licensed under: SEE LICENSE IN https://github.com/1978milanbabic/responsive_sprites_framework/blob/master/LICENSE" + $_nl + "*/" + $_nl + $_nl + '!function(t){function e(t){var v=t.cssclass,w=t.img_source,y=t.total_width,E=t.total_height,C=t.imgs,b=[];this.create=function(){for(var t in C){var e=v+"-"+t,i=document.getElementsByClassName(e);if(i&&0<i.length)for(var n=0;n<i.length;n++){i[n].style.display="inline-block";var o,s,a=i[n].offsetWidth;s=C[t].width,C[t].height,a&&0<a?o=a:(o=s,i[n].style.width=o+"px");var l=C[t].width,d=C[t].height,h=C[t].x,c=C[t].y,r=d/l*100,g=y/l*100,m=h/y*100,p=c/E*100,f=document.createElement("span");f.style.cssText="display: block; position: relative; overflow: hidden; width: 100%; height: 0; padding-bottom: "+r+"%",i[n].appendChild(f);var u=document.createElement("img");u.src=w,u.alt="",u.style.cssText="position: absolute; top: 0; left: 0; width: "+g+"%; height: auto; transform: translate(-"+m+"%, -"+p+"%); ",f.appendChild(u)}else b.push(e)}0<b.length&&console.log("UNUSED PICS: .",b)}}t.addEventListener("DOMContentLoaded",function(){new e({' + imgVar + ').create()},!1)}(document);' + $_nl + '</script>';


                //append prepared framework to textarea
                cont.text(fWork);


                //delete cookie data
                // setCookie("data", "", -13);

            }
        );

        //copy script text
        $("#copy-script").click(function (event) {
            event.preventDefault();
            $("textarea.jsonobj").select();
            document.execCommand("copy");
        });


    });
})(jQuery, document);
