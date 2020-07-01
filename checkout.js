$(document).ready(function() {
    var prodcount = $("#prodcount");
    var cartdiv = $("#cartitemwrapper");
    var orderbtn = $("#orderbtn");
    var totamt = 0;

    var prods;

    if (localStorage.getItem("items") == null) {
        var array = [];
        array = JSON.stringify(array);
        localStorage.setItem("items", array);
        prodcount.text("0");
    } else {
        var tot = 0;
        prods = JSON.parse(localStorage.getItem("items"));
        for (var i = 0; i < prods.length; i++) {
            tot += prods[i].count;
        }
        $("#totitems").text(prods.length);
        prodcount.text(tot);
    }


    for (var i = 0; i < prods.length; i++) {
        cartdiv.append(createcartcard(prods[i].preview, prods[i].name, prods[i].count, prods[i].price));
        totamt = totamt + (prods[i].price * prods[i].count);
    }
    $("#totprice").text("Rs " + totamt);
    orderbtn.click(function() {
        var array = [];
        array = JSON.stringify(array);
        localStorage.setItem("items", array);
        prodcount.text("0");
    })

    function createcartcard(image, title, qty, price) {
        var cartitem = $("<div>").addClass("cartitem");
        var cartimg = $("<img>").attr("src", image);
        var itemcont = $("<div>").addClass("cartcontent");
        var tit = $("<h4>").text(title);
        var qntytxt = $("<p>").text("Qty: ");
        var qnty = $("<span>").text(qty);
        var amttxt = $("<p>").addClass("itemprice").text("Amount: Rs ");
        var tot = qty * price;
        var amt = $("<span>").text(tot);
        amttxt.append(amt);
        qntytxt.append(qnty);
        itemcont.append(tit, qntytxt, amttxt);
        cartitem.append(cartimg, itemcont);
        return cartitem;
    }







})