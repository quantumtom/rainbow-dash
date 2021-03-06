define(function() {

  function render() {
    require(
        [
          'hbar!parts/carousel',
          'data/carousel'
        ], function (carouselPart, carouselData) {
          var appDiv = document.getElementById('page-body');

          appDiv.innerHTML = carouselPart(carouselData);
        });
  }

  return {
    render:render
  };
});
