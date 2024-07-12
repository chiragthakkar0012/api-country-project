const countriesContainer=document.querySelector('.countries-container');
const dark_mode_btn=document.querySelector('.dark-mode-btn');
const header_container=document.querySelector('.header-container');
const filterByregion=document.querySelector('.filter-by-region');
let allCountriesData;
const searchInput=document.querySelector('.search-container input');
var result=false;

 fetch('https://restcountries.com/v3.1/all')
 .then((res)=>res.json())
 .then((data)=>{renderCountries(data);allCountriesData=data});
dark_mode_btn.addEventListener('click',(e)=>
{
countriesContainer.parentElement.classList.toggle('main-class');
header_container.classList.toggle('header-container-dark-mode');
header_container.classList.forEach((classp)=>
   {
       if(classp=='header-container-dark-mode')
       {result=true}
    });
})

filterByregion.addEventListener('change',(e)=>
{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=>res.json())
    .then(renderCountries);
});
  
function renderCountries(data)
{
    countriesContainer.innerHTML=``;
    data.forEach((country) => {
const countryCard=document.createElement('a');
countryCard.href=`./country.html?name=${country.name.common}&darkMode=${result}`;
countryCard.classList.add('country-card');
const cardHtml=` <img src="${country.flags.svg}" alt="flag">
<div class="card-text">
    <h3 class="card-tittle">${country.name.common}</h3>
<p><b>Population:</b>${country.population.toLocaleString('en-IN')}</p>
<p><b>Region:</b>${country.region}</p>
<p><b>Capital:</b>${country.capital?.[0]}</p>
</div>`;
countryCard.innerHTML=cardHtml;
countriesContainer.appendChild(countryCard);
        
  });
}

searchInput.addEventListener('input',(e)=>
{
    
    const filterCountryData=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filterCountryData);
})

