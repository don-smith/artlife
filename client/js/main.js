var eco
  , width = 680
  , height = 440
  , herbivoreCount = 20
  ;

showEmptyEcosystem();

function LifeController($scope) {
  var socket = io.connect();

  $scope.startParameters = {
    ecosystem: {
      height: height
    , width: width
    }
    , herbivoreCount: $scope.herbivoreCount
    , serverSampleRate: $scope.serverSampleRate
  };

  socket.on('connect', function () {
  //  $scope.setName();
  });

  socket.on('activity', function (activities) {
    console.log(activities);
    display(activities);
    //  $scope.messages.push(msg);
    //  $scope.$apply();
  });

  $scope.begin = function begin() {
    socket.emit('startWithParameters', $scope.startParameters);
  };

  $scope.reset = function reset() {
    resetEcosystem();
  };
}

function resetEcosystem() {
  d3.select(".ecosystem").selectAll("g").remove();
}

function showEmptyEcosystem() {
  resetEcosystem();
  eco = d3.select(".ecosystem").append("svg")
    .attr("width", width)
    .attr("height", height);
  eco.append("rect")
      .attr("x", 1)
      .attr("y", 1)
      .attr("fill-opacity", "0")
      .attr("stroke", "silver")
      .attr("width", width - 1)
      .attr("height", height - 1);
}

function display(activities) {
  var degrees = 180 / Math.PI;

  var spermatozoa = activities.map(function(a) {
    return {
        vx: Math.random() * 2 - 1
      , vy: Math.random() * 2 - 1
      , path: d3.range(6).map(function() { return [a.x, a.y]; })
      , count: 0
    };
  });

  var g = eco.selectAll("g")
    .data(spermatozoa)
    .enter().append("g");

  var head = g.append("ellipse")
    .attr("rx", 6.5)
    .attr("ry", 4);

  head.attr("transform", headTransform);

  function headTransform(d) {
    return "translate(" + d.path[0] + ")rotate(" + Math.atan2(d.vy, d.vx) * degrees + ")";
  }
}