angular.module("todomvc", [])
    .directive("todoFocus", $timeout => {
    "use strict";

    return (scope: ng.IScope, elem: JQuery, attrs: any) => {
        scope.$watch(attrs.todoFocus, newVal => {
            if (newVal) {
                $timeout(() => {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});
