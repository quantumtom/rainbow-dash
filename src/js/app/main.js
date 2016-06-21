require([
  'lib/ga',
  'models/user',
  'controllers/home',
  'app/router'
], function (User, Home, Router) {

  var users = [new User('Tom'),
    new User('Dick'),
    new User('Harry')];

  localStorage.users = JSON.stringify(users);

  Home.start();

  Router.startRouting();
});
