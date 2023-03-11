
// DECLARING THE VARIABLES
const countries= document.getElementById("country")
const btn=document.getElementById("btn")
// APIS USED
 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'



const getPosition=function(){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(
            position=>resolve(position),
            err=>reject(err)
        );
       
    });
};
function renderCountry(data){
        
    const html=` 
    <h2 id="currentForecast_location" class="currentForecast_location"> ${lat},${long}
            </h2>
  
    `
 
     countries.insertAdjacentHTML("beforeend",html)
 };
  const renderError= function(msg){

    countries.insertAdjacentText('beforeend',msg)
 
};

const whereAm = async function (){

 try {
    const pos= await getPosition()
    const{latitude:lat,longitude:long}=pos.coords;

    console.log(pos.coords)

    const resGeo =await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    if(!resGeo.ok)throw new Error(`Problem with goecoding${resGeo}`)

    const Bdata= await resGeo.json()

    console.log(Bdata)
   
    const res= await fetch (`https://restcountries.com/v3.1/name/${Bdata.country}`)

    if (!res.ok)
         throw new Error(`country not found${res.status}`)


    const data=await res.json()
    console.log(data)
    renderCountry(data);
    return `you are in ${Bdata.city},${Bdata.country}`
 } catch (error) {
    console.log(error)
    renderError(`Somthin went wrong ${error}`);
    
 }
}



console.log('FIRST');







 btn.addEventListener("click", whereAm)


