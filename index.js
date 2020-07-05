$(document).ready(function() {
    var url = "https://5ee4ea29ddcea00016a37041.mockapi.io/product";
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
    $.get(url, function(resp) {
        console.log(resp);

        for (var i = 0; i < resp.length; i++) {
            var createdcard = createcard(resp[i].id, resp[i].preview, resp[i].name, resp[i].brand, resp[i].price);
            var clothgird = $("#clothingitemwrapper");
            var accessgird = $("#accessoriesitemwrapper");
            if (resp[i].isAccessory == false) {
                clothgird.append(createdcard);
            } else {
                accessgird.append(createdcard);
            }
        }
    })

    $(".carouseldiv").slick({
        dots: true,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 3000
    });



    function createcard(id, img, title, brand, cost) {
        var card = $("<div>").addClass("clothingitem");
        var hyp = $("<a>");
        hyp.attr("href", "./details.html?p=" + id);
        var image = $("<img>");
        image.attr("src", img);
        var carddata = $("<div>");
        var tit = $("<h3>").text(title);
        var brnd = $("<p>").text(brand);
        var pricediv = $("<div>").addClass("pricediv").text("Rs ");
        var price = $("<span>").text(cost);
        pricediv.append(price);
        carddata.append(tit, brnd, pricediv);
        hyp.append(image, carddata);
        card.append(hyp);
        return card;

    }

})
