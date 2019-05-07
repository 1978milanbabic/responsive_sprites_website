//login check script
(function (win) {
    if (!checkLog()) {
        win.location.replace("./errlogin");
    }
})(window);

//upload script
(function ($, doc) {
    $(doc).ready(function () {

        //confirm log before any action
        function confLog(proceed) {
            if (!checkLog()) {
                win.location.replace("./errlogin");
            } else {
                proceed();
                //prolong cookie
                setCookie("user", userNameCookie, 0.5);
            }
        }

        //********* request creation of files ***********
        function callSprites(picType, padding, bgdColor, imgName, folder, className) {
            $.post("./createsprites/create", {
                picType: picType,
                padding: padding,
                bgdColor: bgdColor,
                imgName: imgName,
                folder: folder,
                className: className
            }, function () {
                console.log("post sent");
            }).done(function (data) {
                if (data != "ok") {
                    console.log(data);
                } else {
                    //save data cookie

                    //redirect
                    setTimeout(function () {
                        window.location = "./spritescreated";
                    }, 1000);
                }
            });
        }

        //do sprites on btn
        //scoped data for sending
        var picType;    //value on input[type='radio'] change action

        $("#uploadbtn").click(function (event) {
            event.preventDefault();
            confLog(function () {

                var padding = $("input[name='padding']").val();
                var bgdColor = $("input[name='bgcolor']").val();
                var imgName = $("input[name='imgname']").val();
                var folder = $("input[name='folder']").val();
                var className = $("input[name='cname']").val();

                if (picType && padding >= 0 && bgdColor && imgName && folder && className) {
                    //show loader
                    $(".loader").css("display", "table");
                    //send req for create sprites
                    callSprites(picType, padding, bgdColor, imgName, folder, className);
                } else {
                    alert("You must define your sprites first!");
                }
            });
        });


        //************ files upload ***************
        //first anull input val
        $("#uploadfiles").val("").change();

        var Upload = function (file) {
            this.file = file;
        };

        var picNmb = 0;

        Upload.prototype.getType = function () {
            return this.file.type;
        };
        Upload.prototype.getSize = function () {
            return this.file.size;
        };
        Upload.prototype.getName = function () {
            return this.file.name;
        };
        Upload.prototype.doUpload = function () {
            var that = this;
            var formData = new FormData();

            // add assoc key values, this will be posts values
            formData.append("file", this.file, this.getName());
            formData.append("upload_file", true);

            $.ajax({
                type: "POST",
                url: "./createsprites/upload",
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', that.progressHandling, false);
                    }
                    return myXhr;
                },
                success: function (data) {
                    // add uploaded pic to display
                    var pic = unescape(that.getName()).trim();

                    var $pic = $("<img>", {
                        attr: {
                            alt: "",
                            src: './uploads/' + unescape(userNameCookie) + '/uploads/' + pic
                        }
                    }).load(function () {
                        //hide loader!
                        console.log('Pic uploaded');
                        $(this).parent().find(".loading").fadeOut(300);
                    });

                    //find pic cont and append to it
                    $(".upcont").each(function () {
                        var $this = $(this);
                        //find cont for pic
                        var picname = $this.find(".imgname").html();
                        if (picname === pic) {
                            $this.find(".imgcont").append($pic);
                        }
                    });

                    console.log("Pic upload Complete!", picNmb, data);
                    picNmb++;
                },
                error: function (error) {
                    // handle error
                    console.log(error);
                },
                async: true,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 6000
            }).done(function (resp) {
                console.log(resp);
            });
        };

        Upload.prototype.progressHandling = function (event) {
            var percent = 0;
            var position = event.loaded || event.position;
            var total = event.total;
            var progress_bar_id = "#progress-wrp";
            if (event.lengthComputable) {
                percent = Math.ceil(position / total * 100);
            }
            // update progressbars classes so it fits your code
            $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
            $(progress_bar_id + " .status").text(percent + "%");
        };


        $("#upload input").on("change", function () {
            //reset progress to 0
            $("#progress-wrp .progress-bar").remove();
            $("#progress-wrp").append('<div class="progress-bar"></div>');
            $("#progress-wrp .status").text("0%");

            //change
            var files = $(this)[0].files;
            for (var key in files) {
                var upload = new Upload(files[key]);

                upload.doUpload();
            }

            //files list
            var fileUpdateStart = picNmb;
            var inputF = document.getElementById("uploadfiles");
            for (var i = picNmb; i < inputF.files.length + fileUpdateStart; i++) {

                var lisrNmb = i - picNmb;

                var $uploadedPicContainer = $("<div>", {
                    addClass: "upcont upcont" + i
                });

                var $removeThis = $("<div>", {
                    addClass: "remove",
                    click: function () {
                        removeImg(this);
                    },
                    attr: {
                        title: "delete picture"
                    }
                });

                var $renameThis = $("<div>", {
                    addClass: "rename",
                    click: function () {
                        renameImg(this);
                    },
                    html: "Rename"
                });

                $uploadedPicContainer.append($removeThis);
                $uploadedPicContainer.append('<div class="imgcont"><div class="loading"><img src="./images/ajax-loader.gif" alt=""></div></div>');
                $uploadedPicContainer.append('<p class="imgname">' + inputF.files[lisrNmb].name + '</p>');
                $uploadedPicContainer.append($renameThis);
                $uploadedPicContainer.append('<p class="imgtype">' + inputF.files[lisrNmb].type + '</p>');

                $("#uploaded").append($uploadedPicContainer);

            }
        });

        function removeImg(el) {
            confLog(function () {

                var $self = $(el);
                var $parent = $self.parent();
                var imgName = $parent.find(".imgname").html();

                $parent.remove();
                //remove pic request
                $.ajax({
                    type: "POST",
                    url: "./createsprites/removeimg",
                    data: {
                        removePic: imgName
                    },
                    success: function (resp) {
                        console.log(resp);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });

            });
        }

        function renameImg(el) {
            confLog(function () {

                var $self = $(el);
                var $parent = $self.parent();
                var fullImgName = $parent.find(".imgname").html();
                var imgName = fullImgName.split(".")[0];
                var extension = fullImgName.split(".")[1];

                var newName = prompt("Rename?", imgName);

                if (newName != null && newName.length > 0) {
                    //rename image
                    var newFullName = newName + "." + extension;
                    //localy
                    $parent.find(".imgname").html(newFullName);

                    //request pic rename
                    $.ajax({
                        type: "POST",
                        url: "./createsprites/renameimg",
                        data: {
                            oldName: fullImgName,
                            newName: newFullName
                        },
                        success: function (resp) {
                            console.log(resp);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }

            });
        }

        //switch sprites types (JPG/PNG)
        $("input[type='radio']").on("change", function () {
            var setpicType = $(this).val();
            aprovePics(setpicType);
            //set scoped var
            picType = setpicType;
        });

        function aprovePics(setpicType) {
            var $upconts = $(".upcont");
            $upconts.each(function () {
                var $thisCont = $(this);
                var thisType = $thisCont.find(".imgtype").html().split("/")[1];
                if (thisType === setpicType) {
                    $thisCont.removeClass("notaval");
                } else {
                    $thisCont.addClass("notaval");
                }
            });
        }

    });
})(jQuery, document);