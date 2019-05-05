//login check script
(function (win) {
    if (!checkLog()) {
        win.location.replace("./errlogin");
    }
})(window);

//upload script
(function ($, doc) {
    $(doc).ready(function () {

        //************ files upload ***************
        //********* request creation of files ***********
        function callSprites() {
            $.post("./createsprites/create", {
                creating: "sprites"
            }, function () {
                console.log("post sent");
            }).done(function (data) {
                if (data != "ok") {
                    console.log(data);
                } else {
                    setTimeout(function () {
                        window.location = "./spritescreated";
                    }, 1000);
                }
            });
        }

        $("#uploadbtn").click(function (event) {
            event.preventDefault();
            callSprites();
        });

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

                    $(".upcont" + picNmb + " .imgcont").append($pic);

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


        $("#upload input").on("change", function (e) {
            //reset progress to 0
            $("#progress-wrp .progress-bar").remove();
            $("#progress-wrp").append('<div class="progress-bar"></div>');
            $("#progress-wrp .status").text("0%");

            //izmena
            var files = $(this)[0].files;
            for (var key in files) {
                var upload = new Upload(files[key]);

                upload.doUpload();
            }




            // maybe check size or type here with upload.getSize() and upload.getType()


            // execute upload
            //upload.doUpload();


            //files list
            var fileUpdateStart = picNmb;
            var inputF = document.getElementById("uploadfiles");
            for (var i = picNmb; i < inputF.files.length + fileUpdateStart; i++) {

                var lisrNmb = i - picNmb;

                var $uploadedPicContainer = $("<div>", {
                    addClass: "upcont upcont" + i
                });

                $uploadedPicContainer.append('<div class="imgcont"><div class="loading"><img src="./images/ajax-loader.gif" alt=""></div></div>');
                $uploadedPicContainer.append('<p>' + inputF.files[lisrNmb].name + '</p>');
                $uploadedPicContainer.append('<p>' + inputF.files[lisrNmb].type + '</p>');

                $("#uploaded").append($uploadedPicContainer);

            }

        });

    });
})(jQuery, document);