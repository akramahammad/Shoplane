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
    if (prodcount.text() == 0 || $("#totitems").text() == 0) {
        $("#totpricediv").css({ display: "none" })
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
        alert("Order Placed Successfully");
    })


    function createcartcard(image, title, qty, price) {
        var cartitem = $("<div>").addClass("cartitem");
        var cartimg = $("<img>").attr("src", image);
        var itemcont = $("<div>").addClass("cartcontent");
        var tit = $("<h4>").text(title);
        var qtychangediv = $("<div>").addClass("qtychngediv");
        var plusdiv = $("<div>");
        var plusicon = $("<i>").addClass("fas fa-plus");
        var minusdiv = $("<div>");
        var minusicon = $("<i>").addClass("fas fa-minus");
        var qntytxt = $("<p>").text("x ");
        var qnty = $("<span>").text(qty);
        var amtdeldiv = $("<div>").addClass("amtdeldiv");
        var delicon = $("<i>").addClass("fas fa-trash");
        var amttxt = $("<p>").addClass("itemprice").text("Amount: Rs ");
        var tot = qty * price;
        var amt = $("<span>").text(tot);
        plusdiv.append(plusicon);
        minusdiv.append(minusicon);
        qntytxt.append(qnty);
        amttxt.append(amt);
        amtdeldiv.append(amttxt, delicon);
        qtychangediv.append(minusdiv, qntytxt, plusdiv);
        itemcont.append(tit, qtychangediv, amtdeldiv);
        cartitem.append(cartimg, itemcont);

        delicon.click(function() {
            cartitem.remove();
            totamt = totamt - tot;
            $("#totprice").text("Rs " + totamt);
            var totitems = $("#totitems").text() - 1;
            $("#totitems").text(totitems);
            var cnt;
            var modarr = JSON.parse(localStorage.getItem("items"));
            for (var i = 0; i < modarr.length; i++) {
                if (modarr[i].name == title) {
                    cnt = modarr[i].count;
                    modarr.splice(i, 1);
                    break;
                }
            }
            var oldcnt = prodcount.text();
            var newcnt = oldcnt - cnt;
            prodcount.text(newcnt);
            modarr = JSON.stringify(modarr);
            localStorage.setItem("items", modarr);
        })

        plusdiv.click(function() {
            qty++;
            totamt = totamt - tot;
            tot = qty * price;
            amt.text(tot);
            qnty.text(qty);
            totamt = totamt + tot;
            $("#totprice").text("Rs " + totamt);

            var cnt;
            var modarr = JSON.parse(localStorage.getItem("items"));
            for (var i = 0; i < modarr.length; i++) {
                if (modarr[i].name == title) {
                    cnt = modarr[i].count;
                    cnt++;
                    modarr[i].count = cnt;
                    break;
                }
            }
            var cntold = prodcount.text();
            cntold++;
            prodcount.text(cntold);
            modarr = JSON.stringify(modarr);
            localStorage.setItem("items", modarr);

        })

        minusdiv.click(function() {
            if (qty > 1) {
                qty--;
                totamt = totamt - tot;
                tot = qty * price;
                amt.text(tot);
                qnty.text(qty);
                totamt = totamt + tot;
                $("#totprice").text("Rs " + totamt);
                var cnt;
                var modarr = JSON.parse(localStorage.getItem("items"));
                for (var i = 0; i < modarr.length; i++) {
                    if (modarr[i].name == title) {
                        cnt = modarr[i].count;
                        cnt--;
                        modarr[i].count = cnt;
                        break;
                    }
                }
                var cntold = prodcount.text();
                cntold--;
                prodcount.text(cntold);
                modarr = JSON.stringify(modarr);
                localStorage.setItem("items", modarr);


            }
        })

        return cartitem;
    }







})
