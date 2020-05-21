//アプリのコントロールをするクラス
class SyainController {
  constructor() {
      const btnRemoveItemId = 'btn-delete-item';


      //document.querySelectorの仮名を作る　
      let selector = document.querySelector.bind(document);

      //画面のインプットを呼び出してくる
      this.inputId = selector('#number');
      this.inputFirstName = selector('#firstName');
      this.inputName = selector('#name');
      this.inputPhoneNumber = selector('#phoneNumber');
      this.inputMail = selector('#mail');
              
      this.syainList = selector('.syainList');
      this._syainList = new SyainList()
      this._syainView = new SyainView(this.syainList)
      this._displaySyain()
  }



  // DBからTodoを取得して表示する
  _displaySyain(){
      // DBとの接続
      ConnectionFactory.getConnection()

          // 接続に成功したのでTodoDaoを作成する
          .then(connection => new SyainDao(connection))

          // DBからTODOのリストを読み込む
          .then(dao => dao.fetchAllSyain())

          // TodoList（_todoList）に追加する
          // 画面に表示する(_todoView.update())
          .then(list => {
              // listの中身を一度_todoListに移す
              this._syainList.addAll(list);
              // 画面に_todoListの中身を表示させる
          })

          .then(() => {
          // 画面に_todoListの中身を表示させる
          this._syainView.update(this._syainList.list);

          })

          // エラーが発生したときの処理
          .catch(error => this._handleError(error));
  }

  // ステータスが1のリストを更新
  _displayCompleteSyain(){
      // DBとの接続
      ConnectionFactory.getConnection()

          // 接続に成功したのでTodoDaoを作成する
          .then(connection => new SyainDao(connection))

          // DBからTODOのリストを読み込む
          .then(dao => dao.fetchAllCompleteSyain())

          // TodoList（_todoList）に追加する
          // 画面に表示する(_todoView.update())
          .then(list => {
              // listの中身を一度_todoListに移す
              this._doneList.addAll(list);
              // 画面に_todoListの中身を表示させる
              this._doneView.update(this._doneList.list);
          })
          // エラーが発生したときの処理
          .catch(error => this._handleError(error));

  }

  //TODO を追加する
  addSyain(event) {
      
      event.preventDefault();
      if(this.inputId.value == "" ||
      this.inputFirstName.value == "" ||
      this.inputName.value == "" ||
      this.inputPhoneNumber.value == "" ||
      this.inputMail.value == "" ){
          alert('空欄を入力してください')
          return;
      }
      
      let syain = new Syain(this.inputId.value,this.inputFirstName.value,this.inputName.value,this.inputPhoneNumber.value,this.inputMail.value);


      // DBに保存する
      // DBとの接続
      ConnectionFactory.getConnection()
          // 接続できたのでTodoDaoを作成
          .then(connection => new SyainDao(connection))
          // TodoDAOを通して値を保存する
          .then(dao => dao.storeSyain(syain))
          // エラーが発生した場合
          .catch(error => this._handleError(error));

      this._displaySyain();
  }


  //TODOを一つ完了状態にする
  finishTask(taskId){
      // DBのtaskIdが一致するものをステータス1に変更する
      // ｄｂと接続
      ConnectionFactory.getConnection()
          // 接続ができたらTodoDaoを作る
          .then(connection => new SyainDao(connection))
          .then(dao => dao.completeSyain(taskId))

          .catch(error => this._handleError(error));
      // ステータスが０のリストを更新
      this._displaySyain();

      // ステータスが１のリストを更新
      this._displayCompleteSyain();

      // Todoの数を数えて表示する
      // this._updateTodosCount();
      
  }

  //TODOすべてを完了の状態にする
  allDone() {
      //_todoListの中に入っているTodoすべてをステータス１にする
      //Todoオブジェクトのdone()メソッドを呼ぶ
      this._syainList.list.forEach(todo => {
          
          ConnectionFactory.getConnection()
          .then(connection =>  new SyainDao(connection))
          .then(dao => dao.completeSyain(syainId))
          .catch(error => this._handleError(error));
      });

      //_todoListを空にする
      this._syainList.removeItemById();

      //_todoViewのupdateを呼ぶ
      this._syainView.update(this._syainList.list);

      //_doneViewのupdateを呼ぶ
      this._doneView.update(this._doneList.list);

      this._updateSyainCount();

      this._displayCompleteSyain();
  }

  // Todoを削除するメソッド
  deleteItem(itemId){

      // DBと接続
      ConnectionFactory.getConnection()
          // 接続できたらTodoDaoを作る
          .then(connection => new SyainDao(connection))
          
          // itemIDが一致するものを削除
          .then(dao => dao.removeItem(itemId))

          // エラーが出たときの処理
          .catch(error => this._handleError(error));

          // _donelistの更新
          this._displayCompleteSyain();

      
      // this._doneList.removeItemById(itemId);
      // this._doneView.update(this._doneList.list);

      
  }

  _updateSyainCount() {

      this._countSyain.innerHTML = this._syainList.count;

  }

  // エラー処理
  _handleError(error){
      console.log(error);
      alert('エラーが発生しました。ログを見てください');
  }

}