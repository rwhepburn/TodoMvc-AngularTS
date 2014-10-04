angular.module("todomvc", ["ngRoute"])
    .service("todoStorage", TodoMvc.TodoStorage)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when("/", {
                controller: TodoMvc.TodoCtrl,
                controllerAs: "todoCtrl",
                templateUrl: "todomvc-index.html"
            }).when("/:status", {
                controller: TodoMvc.TodoCtrl,
                controllerAs: "todoCtrl",
                templateUrl: "todomvc-index.html"
            }).otherwise({
                redirectTo: "/"
            });
    });

