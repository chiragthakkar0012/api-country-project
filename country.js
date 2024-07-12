const country_name=new URLSearchParams(window.location.search).get('name');
const flagName=document.querySelector('.country-details img');
const countryNameHeading=document.querySelector('.country-details h1');
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const sub_region=document.querySelector('.sub-region');
const capital=document.querySelector('.capital');
const languages=document.querySelector('.languages');
const top_level_domain=document.querySelector('.top-level-domain');
const currencies=document.querySelector('.currencies');
const border_countries=document.querySelector('.border-countries');
let anchor_tag=`<b>Border Countries:</b>&nbsp; &nbsp;`;
const back_btn=document.querySelector('.back-btn');
back_btn.addEventListener('click',(e)=>
{
    window.history.back();
})

fetch(`https://restcountries.com/v3.1/name/${country_name}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>
{
  console.log(country);
    flagName.src=country.flags.svg;
    countryNameHeading.innerText=country.name.common;
    population.innerText=country.population.toLocaleString('en-IN');
    region.innerText=country.region;
    if(country.subregion)
        {
    sub_region.innerText=country.subregion;
}
    if(country.capital){capital.innerText=country.capital;}
    top_level_domain.innerText=country.tld;
    if(country.languages){languages.innerText=Object.values(country.languages).join(' , ');}
    
    if(country.currencies){ currencies.innerText=Object.values(country.currencies)[0].name;}
if(country.name.nativeName)
    {
        nativeName.innerText=Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeName.innerText=country.name.common;
    }
if(country.borders)
    {
        
    [...country.borders].forEach((border_country)=>
        {
            fetch(`https://restcountries.com/v3.1/alpha/${border_country}`)
            .then((res)=>res.json())
            .then(([border_country_data])=>
            {
              
                console.log(border_country_data);
                anchor_tag+= `<a href="./country.html?name=${border_country_data.name.common}">${border_country_data.name.common}</a>`;
        border_countries.innerHTML=anchor_tag;
            })
             

         
        })
       
       
}

})
const dark_mode_btn=document.querySelector('.dark-mode-btn');
const main=document.querySelector('body');
const header_container=document.querySelector('.header-container');

dark_mode_btn.addEventListener('click',(e)=>
    {
    main.classList.toggle('main-class');
    header_container.classList.toggle('header-container-dark-mode');
    })
     