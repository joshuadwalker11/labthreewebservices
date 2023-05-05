export default {
    baseUrl: "https://localhost:7213/api/todoitems",
    getToDoItems: function (callback) {
        let url = this.baseUrl;
        let fetchPromise = fetch(url); // sends fetch request
        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },

    addTodoItem: function (description, callback) {
        let url = this.baseUrl;

        let payload = {
            "task": description,
            "isComplete": false
        };

        // example of what stringified does
        // '{"task": description, "isComplete": false}'

        let fetchPromise = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        // re use this for json stuff
        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },

    updateTodoItem: function (id, description, complete, callback) {
        let url = this.baseUrl + `/${id}`;

        let payload = {
            "task": description,
            "todoItemId": id,
            "isComplete": complete
        };

        console.log(payload);

        let fetchPromise = fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },

    setTodoItemCompleteStatus: function (id, complete, callback) {
        let url = this.baseUrl + `/${id}/${complete}`;
        // url will look like https://localhost:7213/api/todoitems/id#/complete if complete
        let payload = {
            "isComplete": complete,
            "id": id
        };

        // example of what stringified does
        // '{"task": description, "isComplete": false}'

        let fetchPromise = fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        // re use this for json stuff
        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },

    // how do I know what arguments to give it?
    // to delete something, I only have to tell it the ID
    // the id is specified by the url in line 88
    deleteToDoItem: function (id, callback) {
        let url = this.baseUrl + `/${id}`;

        let fetchPromise = fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });

        let jsonPromise = fetchPromise.then(response => callback());


    }
};
