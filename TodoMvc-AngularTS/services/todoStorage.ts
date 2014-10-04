module TodoMvc {

    var storageId = "todos-angularjs";

    export class TodoStorage {
        constructor(private $window: ng.IWindowService) {
        }

        public get(): ITodo[] {
            return JSON.parse(this.$window.localStorage.getItem(storageId) || "[]");
        }

        public put(todos: ITodo[]) {
            this.$window.localStorage.setItem(storageId, JSON.stringify(todos));
        }
    }

}

 