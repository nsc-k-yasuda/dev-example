class TodoDao{
    //データベースとの接続が必要
    constructor(connection){
        this._con=connection;
    }

    //未完了のTODOを取得
    fetchAllOpenTodo(){
        return new Promise((resolve,reject)=>{
            this._fetchAllTodoByStatus(0,resolve,reject);
            
        });
    }

    //完了のTODOを取得
    fetchDoneTodo(){
        return new Promise((resolve,reject)=>{
            this._fetchAllTodoByStatus(1,resolve,reject);
            
        });
    }

    //指定したステータスが一致する
    _fetchAllTodoByStatus(status,resolve,reject){
        this._con.transaction(tx =>{
            tx.executeSql(
                //SQLコマンド
                'SELECT*FROM todo WHERE status =$1;',
                //パラメーター
                [status],
                //成功したとき
                (tx,result)=>{
                    //データベースにあるTODOを保持しておくためのarray
                    let todoList=[];
                    for(let i=0; i<result.rows.length;i++){
                        let data=result.rows.item(i);

                        todoList.push(
                            new Todo(data.name,data.id,data.status)
                        );
                    }
                    resolve(todoList);
                },
                //失敗したとき
                (tx,error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    //TODOをデータベースに入れる
    storeTodo(todo){
        return new Promise((resolve,reject)=>{
            //DBとの接続からトランザクションを作成します
            this._con.transaction(tx =>{
                //テーブルにデータを入れるSQLコマンドの実行
                tx.executeSql(
                    //SQLコマンド
                    'INSERT INTO todo(name) VALUES($1)',
                    //パラメーター
                    [todo.name],
                    //成功したときの処理
                    (tx,result) => resolve(),
                    //失敗したときの処理
                    (tx,error) => {
                        console.log(error);
                        reject(error);
                    }
                );
            });
        });
    }

    //TODOを完了状態にする
    completeTodo(todoId){
        return new Promise((resolve,reject) =>{
            this._con.transaction(tx =>{
                tx.executeSql(
                    //SQLコマンド
                    'UPDATE todo SET status=1 WHERE id =$1;',
                    //パラメーター
                    [todoId],
                    //成功したときの処理
                    (tx,result)=>resolve(),
                    //失敗したときの処理
                    (tx,error)=>{
                        console.log(error);
                        reject(error);
                    }
                );
            });
        });
    }

    //TODOをデータベースから削除する
    removeItem(todoId){
        return new Promise((resolve,reject) => {
            this._con.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM todo WHERE id=$1 AND status=1;',
                    [todoId],
                    (tx,result) => resolve(),
                    (tx,error)=>{
                        console.log(error);
                        reject(error);
                    }
                );
            })
        })
    }
    
    completeDoneTodo(){
        return new Promise((resolve,reject) =>{
            this._con.transaction(tx =>{
                tx.executeSql(
                    //SQLコマンド
                    'UPDATE todo SET status=1 WHERE status =0;',
                    //パラメーター
                    [],
                    //成功したときの処理
                    (tx,result)=>resolve(),
                    //失敗したときの処理
                    (tx,error)=>{
                        console.log(error);
                        reject(error);
                    }
                );
            });
        });
    }
    
}