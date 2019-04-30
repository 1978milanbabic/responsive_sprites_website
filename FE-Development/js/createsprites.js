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
                    alert(data);
                } else {
                    window.location = "./spritescreated";
                }
            });
        }

        $("#uploadbtn").click(function (event) {
            event.preventDefault();
            callSprites();
        });

        //first anull input val for BB
        $("#uploadfiles").val("").change();

        var Upload = function (file) {
            this.file = file;
        };

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
                    // your callback here
                    console.log("Upload Complete!");
                },
                error: function (error) {
                    // handle error
                    alert(error);
                },
                async: true,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 60000
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
            //var file = $(this)[0].files[0];
            //var upload = new Upload(file);

            //izmena
            var files = $(this)[0].files;
            for (var key in files) {
                var upload = new Upload(files[key]);




                upload.doUpload();
            }




            // maby check size or type here with upload.getSize() and upload.getType()


            // execute upload
            //upload.doUpload();

            //files list
            var inputF = document.getElementById("uploadfiles");
            for (var i = 0; i < inputF.files.length; i++) {
                $("#upload").append('<p>' + inputF.files[i].name + '</p>');
                $("#upload").append('<p>' + inputF.files[i].type + '</p>');
            }

        });

    });
})(jQuery, document);