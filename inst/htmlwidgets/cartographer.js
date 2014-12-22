HTMLWidgets.widget({

  name: 'cartographer',

  type: 'output',

  initialize: function(el, width, height) {

    return {
      // TODO: add instance fields as required
    }

  },

  renderValue: function(el, x, instance) {

    // Debugginj
    global = x;
    console.log(global);

    var div = d3.select("#" + el.id)
      .append("div")
      .style("width", "100%")
      .style("height", "100%")
      .style("position", "relative")
      .classed("map", true);

    var map = d3.carto.map();
    div.call(map);

    var tiles = d3.carto.layer.tile();
    tiles
    .tileType(x.tile.provider)
    .path(x.tile.path)
    .label(x.tile.label);


//    HTMLWidgets.dataframeToD3(x.data);
    var points = d3.carto.layer.xyArray();
    points
    .features(HTMLWidgets.dataframeToD3(x.points.data))
    .label(x.points.label)
    .renderMode("svg")
    .clickableFeatures(x.points.clickable)
    .cssClass("point")
    .markerSize(x.points.size)
    .x(x.points.x)
    .y(x.points.y)
    .on("load", function() {
      d3.selectAll(".point")
        .style("fill", x.points.color)
        .style("fill-opacity", "0.5")
        .style("stroke", "black");
    })

    map.centerOn([-98.5795, 39.828175], "latlong")
       .setScale(2);

    map.addCartoLayer(tiles)
       .addCartoLayer(points);
  },

  resize: function(el, width, height, instance) {

  }

});
