module TodoMvc {

    export interface ITodo {
        title: string;
        completed: boolean;
    }

    export interface IStatusFilter {
        completed: boolean;
    }

    export class TodoCtrl {

        public todos: ITodo[];
        public originalTodo: ITodo;
        public newTodo: string;
        public editedTodo: string;
        public statusFilter: IStatusFilter;
        public status: string;

        // @ngInject
        constructor($scope: ng.IScope, private $routeParams: ng.route.IRouteParamsService, private $filter: ng.IFilterService,
            private todoStorage: TodoStorage) {

            this.todos = todoStorage.get();
            $scope.$on("$routeChangeSuccess", this.onRouteChange);
        }

        public get completedCount() {
            return this.todos.reduce((acc: number, t: ITodo) => acc + Number(t.completed), 0);
        }

        public get remainingCount() {
            return this.todos.reduce((acc: number, t: ITodo) => acc + Number(!t.completed), 0);
        }

        public get allChecked() {
            return this.todos.every((t: ITodo) => t.completed);
        }

        private save() {
            this.todoStorage.put(this.todos);
        }

        public addTodo() {
            var newTodo = this.newTodo.trim();
            if (!newTodo.length) {
                return;
            }

            this.todos.push({
                title: newTodo,
                completed: false
            });
            this.save();
            this.newTodo = "";
        }

        public markAsCompleted(todo: ITodo) {
            todo.completed = !todo.completed;
            this.save();
        }

        public editTodo(todo: string) {
            this.editedTodo = todo;
            this.originalTodo = angular.extend({}, todo);
        }

        public doneEditing(todo: ITodo) {
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
            this.save();
        }

        public revertEditing(todo: ITodo) {
            this.todos[this.todos.indexOf(todo)] = this.originalTodo;
            this.doneEditing(this.originalTodo);
        }

        public removeTodo(todo: ITodo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            this.save();
        }

        public clearCompletedTodos() {
            this.todos = this.todos.filter(val => !val.completed);
            this.save();
        }

        public markAll(completed: boolean) {
            this.todos.forEach((todo: ITodo) => {
                todo.completed = !completed;
            });
        }

/* tslint:disable */
        private onRouteChange = () => {
            this.status = this.$routeParams["status"] || "";

            this.statusFilter = (this.status === "active") ?
                { completed: false } : (this.status === "completed") ?
                { completed: true } : null;
        }
/* tslint:enable */

    }

}
