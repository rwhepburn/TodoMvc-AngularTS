angular.module("todomvc", [])
    .directive("todoEscape", () => {
    "use strict";

    var ESCAPE_KEY = 27;

    return (scope: ng.IScope, elem: JQuery, attrs: any) => {
        elem.bind("keydown", event => {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attrs.todoEscape);
            }
        });
    };
});
