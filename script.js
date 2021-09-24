async function scatter(){
    //scatter plot for european city data 
    let cityData;

    await d3.csv('cities.csv', d3.autoType).then(data=>{
        cityData = data;
        console.log('cities', data);
        
    })
    console.log('city data ', cityData);

    let europeanCountries = cityData.filter(country => country.eu == true);
    console.log('euro cities ', europeanCountries);
    d3.select('.city-count').text('Number of cities: ' + europeanCountries.length);

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    svg.selectAll("circle")
        .data(europeanCountries)
        .enter()
        .append("circle")
        .attr('cx', function (d, i){
            // d: datum
            // i: index
            return d.x;
        })
        .attr('cy', function (d, i){
            return d.y;
        })
        .attr("r", function (d, i){
            return (d.population < 1000000) ? 4 : 8;
        })
        .attr("fill", "orange");

    let bigCities = europeanCountries.filter(country => country.population > 1000000);
    //labels for circles with large population
    svg.selectAll("text")
        .data(bigCities)
        .enter()
        .append("text")
        .text(function (d, i){
        return d.country;
        })
        .attr("dx", function (d, i){
            return d.x;
        })
        .attr("dy", function (d, i){
            return d.y-12;
        })
        .attr("font-size", 11)
        .attr("text-anchor", "middle");
};
        
scatter();
//bar chart of tallest buildings
async function bar(){
    let buildingData;

    await d3.csv('buildings.csv', d3.autoType).then(data=>{
        buildingData = data.sort(function(a, b){return b.height_m - a.height_m});
        console.log('buildings ', data);
        console.log('buildings sort', buildingData);
        
    })

    const width = 500;
    const height = 500;
    const svg = d3.select('.building-height-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    //bar chart - horizontal
    svg.selectAll("rect")
        .data(buildingData)
        .enter()
        .append("rect")
        .attr('height', 40)
        .attr('width', function (d, i){
            return d.height_px;
        })
        .attr('x', 250)
        .attr('y', function (d, i){
            return i*(50);
        })
        .attr("fill", "orange")
        .on("click", function(d, i) {
            // Do something after clicking a bar
            
                d3.select('.image').attr("src", ("/introD3/img/img/" + i.image));
                d3.select('.building-name').text(i.building);
                d3.select('.height').text(i.height_ft);
                d3.select('.city').text(i.city);
                d3.select('.year').text(i.completed);
                d3.select('.floors').text(i.floors);
            });

    let texts = svg.selectAll("text")
                .data(buildingData)
                .enter();

    //building name for bar chart
    texts.append("text")
        .text(function (d, i){
        return d.building;
        })
        .attr("dx", 10)
        .attr("dy", function (d, i){
            return i*(50)+25;
        })
        .attr("font-size", 15);
    //building height for bar chart
    texts.append("text")
        .text(function (d, i){
        return d.height_ft + " ft";
        })
        .attr("dx",  function (d, i){
            return 220+d.height_px;
        })
        .attr("dy", function (d, i){
            return i*(50)+25;
        })
        .attr("text-anchor", "end")
        .attr("font-size", 15)
        .attr("fill", "white");
    
   
        
}

bar();
