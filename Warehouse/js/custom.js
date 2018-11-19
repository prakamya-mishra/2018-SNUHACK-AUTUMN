$(document).ready(function(){
    $("form").submit(function(e){
      e.preventDefault();
      console.log("Submit")
      var name = document.getElementById("name").value;
      var des = document.getElementById("description").value;
      var features = document.getElementById("feature").value;
      var e = document.getElementById("category");
      var optionval = e.options[e.selectedIndex].text;
      var quantity = document.getElementById("quantity").value;
      /*addProduct(id, name, category, quantity, desc, _features);*/
      var product = {"name": name,"descrip": des,"features": features,"options": optionval,"quantity": quantity}
      $.post("http://localhost:8080/addprod",product,function(response){
        console.log(response)
      })
    });
});
