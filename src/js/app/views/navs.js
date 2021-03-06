define(function() {

  function render() {
    require(
        [
          'hbar!parts/navs',
          'data/navs'
        ], function (navsPart, navsData) {
          var appDiv = document.getElementById('page-body');

          appDiv.innerHTML = navsPart(navsData);
        });
  }

  return {
    render:render
  };
});
