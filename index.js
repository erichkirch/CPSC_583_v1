var canvas = d3.select("body").append("svg")
    .attr("width", 3500)
    .attr("height", 900);

/*
var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName('body')[0],
    x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

var canvas = d3.select("body").append("svg")
    .attr("width", x)
    .attr("height", y);
*/

d3.select("div#chartId")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    //class to make it responsive
    .classed("svg-content-responsive", true);

window.onload = function(){
    setup();
};

function setup(){
    printLegend();
    loadData("comic_chars_marvel_v2_2000.csv");
}

function printLegend(){
    var fillColorBG = "#85DCB0";

    canvas.append("rect")
        .attr("width", 175)
        .attr("height", 80)
        .attr("x", 150)
        .attr("y",153)
        .attr("fill", fillColorBG)
        .attr("stroke", "black");

    canvas.append("text")
        .attr("dy", 174)
        .attr("dx", 166)
        .text("Heterosexual: ");
    canvas.append("circle")
        .attr("cx", 288)
        .attr("cy", 170)
        .attr("r", 8)
        .attr("fill", "#85DCB0")
        .attr("stroke", "black");


    canvas.append("text")
        .attr("dy", 198)
        .attr("dx", 166)
        .text("Bisexual: ");
    canvas.append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("x", 280)
        .attr("y", 185)
        .attr("fill", "#85DCB0")
        .attr("stroke", "black");

    canvas.append("text")
        .attr("dy", 222)
        .attr("dx", 166)
        .text("Homosexual: ");
    var triangle = d3.symbol().type(d3.symbolTriangle);
    canvas.append("path")
        .attr("d", triangle.size(90))
        .attr("transform", function(d) { return "translate(" + (287) + "," + (216) + ")"; })
        .attr("fill","#85DCB0")
        .attr("stroke", "black");
}

function loadData(path){
    var years = new Array(2020).fill(0);
    var spaceBetween = 45;
    var lefthandOffset = 1700;
    var yOffset = 900;

    canvas.append("text")
        .attr("dy", yOffset)
        .attr("dx", ((1957 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1957);

    canvas.append("text")
        .attr("dy", yOffset)
        .attr("dx", ((1959 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1959);

    d3.csv((path), function(data){
        years[data.YEAR] += 1;
        var yPos = -1*(30 + 10 * (years[data.YEAR]));
        //var fillColor = "gray";
        var fillColor = "#41B3A3";
        //var fillColor = "#E27D60"

        if((data.GSM).localeCompare("Homosexual Characters") === 0){
            var triangle = d3.symbol().type(d3.symbolTriangle);

            canvas.append("path")
                .attr("d", triangle.size(60))
                .attr("transform", function(d) { return "translate(" + ((data.YEAR - 1900) * spaceBetween - lefthandOffset) + "," + (yOffset + yPos + 0) + ")"; })
                .attr("fill", fillColor);
        }
        else if((data.GSM).localeCompare("Bisexual Characters") === 0){
            canvas.append("rect")
                .attr("width", 10)
                .attr("height", 9)
                .attr("x", (data.YEAR - 1900) * spaceBetween - lefthandOffset - 5)
                .attr("y", yOffset + yPos - 6)
                .attr("fill", fillColor);
        }
        else{
            canvas.append("circle")
                .attr("cx", (data.YEAR - 1900) * spaceBetween - lefthandOffset)
                .attr("cy", yOffset + yPos - 1)
                .attr("r", 5)
                .attr("fill", fillColor);
        }
        /*canvas.append("text")
            .attr("dx", (data.YEAR - 1900) * spaceBetween - lefthandOffset)
            .attr("dy", yOffset + yPos + 5)
            .text(data.NAME);
        */
        if(years[data.YEAR] < 2) {
            canvas.append("text")
                .attr("dy", yOffset)
                .attr("dx", ((data.YEAR - 1900) * spaceBetween) - 15 - lefthandOffset)
                .text(data.YEAR);
        }
        return {
            Name: data.NAME,
            Year: data.YEAR
        }
    }).then(function(data){
        logger(data);
    });
}

function logger(data) {
    console.log(data);
}