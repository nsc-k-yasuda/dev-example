//アプリのコントロールをするクラス
class TodoController {
    constructor() {
        const btnRemoveItemId = 'btn-delete-item';

        //document.querySelectorの仮名を作る　
        let selector = document.querySelector.bind(document);

        //画面のインプットを呼び出してくる
        this.inputTodo = selector('.add-todo');
        this._ulTodos = selector('#sortable');
        this._ulDones = selector('#done-items');
        this._countTodos = selector('.count-todos');


        //画面のインプットにキーボードが押されたことを監視する。
        this.inputTodo.addEventListener('keypress', function (event) {
            event.preventDefault;

            //押されたキーがEnterかどうかをチェック
            // if (event.key.toLowerCase() == 'enter') {
            
            if(isEquals('enter', event.key)){

                //インプットの値が空ではないことをチェック
                if (event.target.value != '') {
                    console.log(event.target.value);
                    //TODOを追加するを呼び出す。
                    this.addTodo(event.target.value);

                }
            }

        }.bind(this));

        this._todoList = new TodoList();
        this._doneList = new DoneList();
        this._todoView = new TodoView(this._ulTodos);
        this._doneView = new DoneView(this._ulDones);

        this._ulDones.addEventListener('click', function(event){
            event.preventDefault;

            // console.log(event.target);
            // console.log(event.target.parentElement);
            let itemValue;



            if (isEquals(btnRemoveItemId, event.target.id)) {
                itemValue = event.target.value;
            } else if (isEquals(btnRemoveItemId, event.target.parentElement.id)) {
                itemValue = event.target.parentElement.value;
            }
            
            console.log(itemValue);

            if (itemValue) {
                this.deleteItem(itemValue);
            }
            
        }.bind(this));
        //Todo側のアイテムクリックを処理
        this._ulTodos.addEventListener('click', function(event){
            event.preventDefault();
            console.log(event);

            
            let labelNode;
            
            if(event.target.matches('label')) {
                labelNode = event.target;
            } else {
                labelNode = event.target.parentNode;
            }
            
            console.log(labelNode.firstElementChild);
            this.finishTask(labelNode.firstElementChild.value);

        }.bind(this));

        //画面が表示された時に、DBからTodoを取得して表示する
        this._displayOpenTodos();
        this._displayCompleteTodos();
        //Todoの数を数えて表示する
        this._updateTodosCount();
    }

    //DBからTodoを取得して表示
    _displayOpenTodos(){
        //DBとの接続
        ConnectionFactory.getConnection()
            //接続に成功したのでTodoDaoを作成する
            .then(connection => new TodoDao(connection))
            //DBからTODOのリストを読み込む
            .then(dao => dao.fetchAllOpenTodo())
            //TodoList(_todoList)に追加する
            //画面に表示する(_todoView.update())
            .then(list => {
                //listの中身を一度_todoListに移す
                this._todoList.addAll(list);
                
            })
            .then(()=>{
                //画面に_todoListの中身を表示させる
                this._todoView.update(this._todoList.list);
                //Todoの数を数えて表示
                this._updateTodosCount()
            })
            //エラーが発生した時の処理
            .catch(error => this._handleError(error));
    }
    //ステータスが１
    _displayCompleteTodos(){
        //DBとの接続
        ConnectionFactory.getConnection()
            //接続に成功したのでTodoDaoを作成する
            .then(connection => new TodoDao(connection))
            //DBからTODOのリストを読み込む
            .then(dao => dao.fetchDoneTodo())
            .then(list => {
                this._doneList.addAll(list);
                this._doneView.update(this._doneList.list);
            })
            //エラーが発生した時の処理
            .catch(error =>{this._handleError(error)});

    }
    //TODO を追加する
    addTodo(inputValue) {

        //inputValueを使ってTodoオブジェクトを作成
        let todo = new Todo(inputValue);

        ConnectionFactory.getConnection()
            .then(connection => new TodoDao(connection))
            //接続できたのでTodoDAOを作成
            .then(dao => dao.storeTodo(todo))//TodoDAOの保存するメソッド
            //エラーが発生した場合
            .catch(error => this._handleError(error));
            
        //DBからTodoを取得して表示
        this._displayOpenTodos();
        
        //インプットに入力されているものを消す。
        this.inputTodo.value = '';
        //Todoの数を数えて表示
        this._updateTodosCount();
    }

    //TODOを一つ完了状態にする
    finishTask(taskId){
        //DBのtaskIdが一致するもののステータスを１する
        ConnectionFactory.getConnection()
        .then(connection => new TodoDao(connection))
        .then(dao => dao.completeTodo(taskId))
        .catch(error => this._handleError(error));
        this._displayOpenTodos();
        this._displayCompleteTodos();
        //this._updateTodosCount();
    }

    //TODOすべてを完了の状態にする
    allDone() {
        ConnectionFactory.getConnection()
            //接続に成功したのでTodoDaoを作成する
            .then(connection => new TodoDao(connection))
            //DBからTODOのリストを読み込む
            .then(dao => dao.completeDoneTodo())
            .then(()=> {
                this._displayOpenTodos();
                this._displayCompleteTodos();
            })
            //エラーが発生した時の処理
            .catch(error => this._handleError(error));

    }

    //Todoを削除するメソッド
    deleteItem(itemId){
        //DBとの接続
        ConnectionFactory.getConnection()
        //接続出来たらTodoDao作る
            .then(connection => new TodoDao(connection))
        //itemIdが一致するものを削除
            .then(dao => dao.removeItem(itemId))
            .catch(error => this._handleError(error))
        //_donelistの更新
            this._displayCompleteTodos();
        // this._doneList.removeItemById(itemId);

        // this._doneView.update(this._doneList.list);

        
    }

    _updateTodosCount() {

        this._countTodos.innerHTML = this._todoList.count;

    }
    
    _handleError(error){
        console.log(error);
                alert('エラーが発生しました。ログ見て');
    }

}