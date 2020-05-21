const ConnectionFactory= (function(){

    // DBサイズ
    const dbSize = 1024*1024*2;
    // DBの名前
    const dbName = "a.db";
    // DBの表示名
    const dbDisplayName = 'syain';
    // DBのバージョン
    const dbVersion = "1";

    // データーベースとの接続を保持しておく
    let connection = null;


    // データーベースとの接続を用意してくれるクラス
    return class ConnectionFactory{

        // コンストラクター直接呼べないようにする
        // 外から呼べるようにしてしまうとデーターベースとの接続が同時に複数作られる可能性がある
        constructor(){
            throw new Error("can not create an instance of ConnectionFactory");
        }

        static getConnection(){
            return new Promise((resolve,reject) => {
                try {
                    // ここでエラーが出たら
                    // データベースを開く
                    connection = openDatabase(
                        // 名前
                        dbName,
                        // バージョン
                        dbVersion,
                        // 表示する名前
                        dbDisplayName,
                        // DBサイズ
                        dbSize
                    );
                    ConnectionFactory._migrateDb()
                        .then(resolve(connection))
                        .catch(error => {
                            console.log(error);
                            reject(error);
                        });

                }catch(error){
                    // ここでエラーを処理する
                    console.log(error);
                    reject(error);
                }
            });
        }
        // DBのテーブルの作成・更新などを行う
        static _migrateDb(){
            return new Promise((resolve,reject) => {
                // sqlコマンドを保存する
                let sql = "CREATE TABLE IF NOT EXISTS syain(\
                    id INTEGER PRIMARY KEY,\
                    firstName TEXT,\
                    name TEXT,\
                    phoneNumber INTEGER,\
                    mail TEXT\
                );";
                
                
                // トランザクションを開く
                connection.transaction(tx => {

                    // 指定したSQLを実行する
                    tx.executeSql(
                        // SQLコマンド
                        sql,

                        // パラメーター
                        [],

                        // 成功したとき
                        (tx,result) => resolve(),

                        // 失敗したとき
                        (tx,error) => reject(error)

                    )
                });
            });
        }
    }
})();