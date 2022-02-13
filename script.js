document.addEventListener("DOMContentLoaded",function(){
    //Creating elements using Id
    var result = document.getElementById("result")
    var form = document.getElementById("form")
    var searchbox = document.getElementById("searchbox")
    var homebutton = document.getElementById("homebutton")
    function populate(data){
        //This function populates the page with the results provided as the parameter
        result.innerHTML=""
        if(data.length==0){
            //If the length of the data is zero then it displays "No Results Found"
            result.innerHTML+="<div class='not-found'>No Results Found</div>"
        }
        else{   
            for(let i=0;i<data.length;i++){
                var street
                var city
                var state
                var phone
                //street, city, state, phone will have null values so it is handles using if else
                if(data[i]["street"]==null){
                    street=""
                }
                else{
                    street=data[i]["street"]+','
                }
                if(data[i]["city"]==null){
                    city=""
                }
                else{
                    city=data[i]["city"]+','
                }
                if(data[i]["state"]==null){
                    state=""
                }
                else{
                    state=data[i]["state"]+','
                }
                if(data[i]["phone"]==null){
                    phone="Not Available"
                }
                else{
                    phone=data[i]["phone"]
                }

                //If website url is not provided then the website button is disabled
                if(data[i]["website_url"]==null){
                    result.innerHTML+=`<div class="res">
                    <div class="name">${data[i]["name"]}</div>
                    <br>
                    <div class="type"><span class="label">Brewery Type:</span>${data[i]["brewery_type"]}</div><br>
                    <div class="address">${street} ${city} ${state} ${data[i]["country"]}</div><br>
                    <div class="website"><button onclick="location.href='${data[i]["website_url"]}'" type="button" disabled>Website</button></div><br>
                    <div class="phone"><div class="label">Phone:</div>${phone}</div>
                    </div> `
                    }

                else{
                    result.innerHTML+=`<div class="res">
                    <div class="name">${data[i]["name"]}</div>
                    <br>
                    <div class="type"><span class="label">Brewery Type:</span>${data[i]["brewery_type"]}</div><br>
                    <div class="address">${street} ${city} ${state} ${data[i]["country"]}</div><br>
                    <div class="website"><button onclick="location.href='${data[i]["website_url"]}'" type="button">Website</button></div><br>
                    <div class="phone"><div class="label">Phone:</div>${phone}</div>
                    </div>`
                    }
                
            }
        }

    }
    function error(){
        //This function shows the message "Something went wrong" when 
        result.innerHTML="<div class='not-found'>Something went Wrong</div>"
    }

    async function homepage(){
        //This function fetches data from api = "https://api.openbrewerydb.org/breweries" and passes the data to populate()
        await fetch('https://api.openbrewerydb.org/breweries').then(res=>res.json()).then(res=>populate(res)).catch(err=>error())
    }
    homepage()

    async function search(){
        //This function uses the value at the searchbox and fetch the api and pass the data to populate
        await fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchbox.value}`).then(res=>res.json()).then(res=>populate(res)).catch(err=>error())
    }

    form.addEventListener('submit',function(event){
        //When the form is submitted search() gets called and reloading of the page is prevented
        search()
        event.preventDefault()
    })

    homebutton.addEventListener('click',function(){
        //When homebutton is clicked it calls homepage()
        homepage()
    })
    

})