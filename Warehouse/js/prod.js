$(document).ready(function(){
    $.get('http://localhost:8080/getprod',function(response){
      if(response.length > 0){
      for(var i=0;i<response.length;i++){
        var name = response[i].name
        var features = response[i].features
        var descrip = response[i].descrip
        var option = response[i].options
        var quantity = response[i].quantity
        var tr = document.createElement("tr")
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
        tr.appendChild(quantitytd);

        document.getElementById("table").appendChild(tr);

      }
    }
    })
});
