$(document).ready(function() {
    var pid = window.location.search.split("=")[1];
    var prodlink = "https://5ee4ea29ddcea00016a37041.mockapi.io/details/" + pid;
    var prodcount = $("#prodcount");

    if (localStorage.getItem("items") == null) {
        var array = [];
        array = JSON.stringify(array);
        localStorage.setItem("items", array);
        prodcount.text("0");
    } else {
        var tot = 0;
        var prods = JSON.parse(localStorage.getItem("items"));
        for (var i = 0; i < prods.length; i++) {
            tot += prods[i].count;
        }
        prodcount.text(tot);
    }
    var disp = false;
    $(".fa-bars").click(function() {
        if (disp == false) {
            $(this).removeClass("fa-bars");
            $(this).addClass("fa-times");
            $("#dropdown").css({ height: "165px", padding: "10px 0" });
            disp = true;
        } else {
            $(this).removeClass("fa-times");
            $(this).addClass("fa-bars");
            $("#dropdown").css({ height: "0", padding: "0" });
            disp = false;
        }
    })

    const detailscall = new Promise(function(resolve, reject) {
        $.get(prodlink, function(resp) {
            resolve(resp);
        }).fail(function() {
            reject(new Error("Details call failed"));
        })
    })
    detailscall
        .then(function(passdata) {
            var mainimage = $("#prodimg>img");
            mainimage.attr("src", passdata.preview);
            $("#prodtitle").text(passdata.name);
            $("#prodbrand").text(passdata.brand);
            $("#prodprice").text("Rs " + passdata.price);
            $("#desc").text(passdata.description);
            var previmages = passdata.photos;

            for (var i = 0; i < previmages.length; i++) {
                var newprev = createprevimage(previmages[i]);
                $(".prodimages").append(newprev);
            }
            $(".prodimages>img:first-child").addClass("active");
            $(".prodimages>img").click(function() {
                $(".prodimages>img").removeClass("active");
                $(this).addClass("active");
                mainimage.attr("src", $(this).attr("src"));
            })

            function createprevimage(image) {
                var img = $("<img>");
                img.attr("src", image);
                return img;
            }
            var addbtn = $("#addbtn");
            addbtn.click(function() {
                var arr = JSON.parse(window.localStorage.getItem("items"));
                var present = false;
                addbtn.addClass("pop");
                setTimeout(function() {
                    addbtn.removeClass("pop");
                }, 200)
                var pos;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == passdata.id) {
                        present = true;
                        pos = i;
                        break;
                    }
                }
                if (present) {
                    var newcount = arr[pos].count + 1;
                    passdata.count = newcount;
                    arr.splice(pos, 1);
                    arr.push(passdata);
                    arr = JSON.stringify(arr);
                } else {
                    passdata.count = 1;
                    arr.push(passdata);
                    arr = JSON.stringify(arr);
                }
                window.localStorage.setItem("items", arr);
                var now = prodcount.text();
                now++;
                prodcount.text(now);

            })

        })
        .catch(function(faildata) {
            console.log(faildata);
        })


})
