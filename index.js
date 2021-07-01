let searchField = document.querySelector(".search");
let searchButton = document.querySelector(".searchButton");
let searchOutput = document.querySelector(".searchOutput");

searchField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});
searchButton.addEventListener("click", () => {
    searchOutput.innerHTML = "";
    fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json())
        .then((data) => {
            data.map((el) => {
                if (
                    el.name
                        .toLowerCase()
                        .includes(searchField.value.toLowerCase())
                ) {
                    render(el);
                }
            });
        });
});

function render(obj) {
    let searchedCountry = document.createElement("div");
    searchedCountry.className = "searchedCountry";
    let link = obj.name;
    searchedCountry.addEventListener("click", () => {
        window.open(`https://en.wikipedia.org/wiki/${link}`, "_blank");
    });
    let countryName = document.createElement("p");
    countryName.textContent = "Country - " + obj.name;
    countryName.className = "countryDescription";
    let capital = document.createElement("p");
    capital.textContent = "Capital - " + obj.capital;
    capital.className = "countryDescription";
    let region = document.createElement("p");
    region.textContent = "Region - " + obj.region;
    region.className = "countryDescription";
    let population = document.createElement("p");
    population.textContent = "Population - " + obj.population;
    population.className = "countryDescription";
    let area = document.createElement("p");
    area.textContent = "Area - " + obj.area;
    area.className = "countryDescription";
    let timezones = document.createElement("p");
    timezones.textContent =
        "Timezone - " + String(obj.timezones).replaceAll(",", ", ");
    timezones.className = "countryDescription";
    let borders = document.createElement("p");
    borders.textContent =
        "Borders - " + String(obj.borders).replaceAll(",", ", ");
    borders.className = "countryDescription";
    let flag = document.createElement("img");
    flag.src = obj.flag;
    flag.className = "flag";
    searchedCountry.append(
        countryName,
        capital,
        region,
        population,
        area,
        timezones,
        borders,
        flag
    );
    searchOutput.appendChild(searchedCountry);
}
