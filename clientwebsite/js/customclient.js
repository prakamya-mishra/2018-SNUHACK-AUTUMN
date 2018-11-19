$(document).ready(function(){
    $.get('http://localhost:8080/getprod',function(response){
      if(response.length > 0){
      for(var i=0;i<response.length;i++){
        var name = response[i].name
        var features = response[i].features
        var descrip = response[i].descrip
        var option = response[i].options
        var quantity = response[i].quantity
        /*var tr = document.createElement("tr")
        var nametd = document.createElement("td")
        nametd.innerHTML = name
        var featurestd = document.createElement("td")
        featurestd.innerHTML = features
        var descriptd = document.createElement("td")
        descriptd.innerHTML = descrip
        var optiontd = document.createElement("td")
        optiontd.innerHTML = option
        var quantitytd = document.createElement("td")
        quantitytd.innerHTML = quantity

        tr.appendChild(nametd);
        tr.appendChild(featurestd);
        tr.appendChild(descriptd);
        tr.appendChild(optiontd);
        tr.appendChild(quantitytd);*/

        var tr = document.createElement("tr")
        var td1 = document.createElement("td")
        var h3 = document.createElement("h3")
        h3.innerHTML = name
        var p1 = document.createElement("p")
        p1.innerHTML = descrip
        var td2 = document.createElement("td")
        td2.setAttribute("align", "right")
        var p2 = document.createElement("p")
        var select = document.createElement("select")
        select.setAttribute("style", "float:auto;;")
        var o1 = document.createElement("option")
        o1.setAttribute("value", "1")
        o1.innerHTML = 1
        var o2 = document.createElement("option")
        o2.setAttribute("value", "2")
        o2.innerHTML = 2
        var o3 = document.createElement("option")
        o3.setAttribute("value", "3")
        o3.innerHTML = 3
        var o4 = document.createElement("option")
        o4.setAttribute("value", "4")
        o4.innerHTML = 4
        var o5 = document.createElement("option")
        o5.setAttribute("value", "5")
        o5.innerHTML = 5
        var o6 = document.createElement("option")
        o6.setAttribute("value", "6")
        o6.innerHTML = 6
        var o7 = document.createElement("option")
        o7.setAttribute("value", "7")
        o7.innerHTML = 7
        var o8 = document.createElement("option")
        o8.setAttribute("value", "8")
        o8.innerHTML = 8
        var o9 = document.createElement("option")
        o9.setAttribute("value", "9")
        o9.innerHTML = 9
        var o10 = document.createElement("option")
        o10.setAttribute("value", "10")
        o10.innerHTML = 10
        var button = document.createElement("button")
        button.setAttribute("onclick", "placeOrder()")
        button.setAttribute("class", "button")
        button.innerHTML = "Buy Now"

        select.appendChild(o1)
        select.appendChild(o2)
        select.appendChild(o3)
        select.appendChild(o4)
        select.appendChild(o5)
        select.appendChild(o6)
        select.appendChild(o7)
        select.appendChild(o8)
        select.appendChild(o9)
        select.appendChild(o10)
        p2.appendChild(select)
        p2.appendChild(button)
        td2.appendChild(p2)
        td1.appendChild(h3)
        td1.appendChild(p1)
        tr.appendChild(td1)
        tr.appendChild(td2)

        document.getElementById("clientlist").appendChild(tr);

      }
    }
    })
});
