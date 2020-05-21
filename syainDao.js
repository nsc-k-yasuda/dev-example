// DAO・・・Data Access Object　データー アクセス オブジェクト
// 特定クラスのオブジェクトとDBとの間を取り持つクラス
class SyainDao{

  // データベースとの接続が必要
  constructor(connection){
      this._con = connection;
  }

  // 未完了のTODOを取得する
  fetchAllSyain(){
      return new Promise((resolve, reject) => {
        this._con.transaction(tx =>{
          tx.executeSql(
             // SQLコマンド
             "SELECT * FROM syain;",

             // パラメーター
             [],

             // 成功したとき
             (tx,result)=>{
                  // データーベースにあるTODOを保持しておくためのarray
                  let syainList = [];

                  // SELECTの結果の一行一行を順番に処理していく
                  for(let i = 0; i < result.rows.length; i++){
                      let data = result.rows.item(i);

                      // 一行のデータをTodo
                      syainList.push(
                         new Syain(data.id,data.firstName,data.name,data.phoneNumber,data.mail)
                      );
                  }
                  resolve(syainList);
                },

             // 失敗したとき
                (tx,error)=>{
                    console.log(error);
                    reject(error);
                }
                );
            });
        });
      }

  // TODOをデータに入れる
  storeSyain(syain){
      return new Promise((resolve, reject) =>{
          // DBとの接続からトランザクションを作成します
          this._con.transaction(tx => {

              //テーブルにデータを入れるSQLコマンドの実行 
              tx.executeSql(
                  // SQLコマンドphoneNumber
                  'INSERT INTO syain(id, firstName, name, phoneNumber, mail) VALUES($1,$2,$3,$4,$5)',

                  // パラメーター
                  [syain.id, syain.firstName, syain.name, syain.phoneNumber, syain.mail],

                  // 成功したときの処理
                  (tx,result) => resolve(),

                  // 失敗したときの処理
                  (tx,error) => {
                      console.log(error);
                      reject(error);
                  }

              );
          });
      });
  }

  // TODOを完了状態にする（ステータスを１に変更）
  completeSyain(syainId){

      return new Promise((resolve,reject) => {
          this._con.transaction(tx =>{
              // SQLコマンドの実行
              tx.executeSql(
                  // SQLコマンド
                  'SELECT * FROM syain',

                  // パラメーター
                  [syainId],

                  // 成功したときの処理
                  (tx,result) => resolve(),

                  // 失敗したときの処理
                  (tx,error) => {
                      console.log(error);
                      reject(error);
                  }

              );
          });

      });
  }

  // TODOをデーターベースから削除する
  removeItem(syainId){
      return new Promise((resolve,reject) => {

          // 接続からトランザクションを作成
          this._con.transaction(tx => {
              // SQLコマンドを実行
              tx.executeSql(
                  // SQLコマンド
                  'DELETE FROM syain WHERE id = 1',
                  // パラメーター
                  [id],
                  // 成功したとき
                  (tx,result) => resolve(),
                  // 失敗したとき
                  (tx,error) => {
                      console.log(error);
                      reject(error);
                  }
              );
          });
      });
  }

  
}