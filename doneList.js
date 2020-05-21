//完了したTODOを持っておくリストクラス
class DoneList extends BaseList {

    constructor() {
        //BaseListのコンストラクターを呼び出す
        super();
    }

    //TODOを追加する
    addSyain(syain) {
        //追加する前にTODOが完了していることをチェック
        if(syain.isDone()) {
            super.addSyain(syain);
        }
    }

    addAll(newList){
        super.addAll(newList);
    }

    //IDを使ってアイテムを削除する
    removeItemById(itemId){
        
        let item = this.findItemById(itemId);

        if(item) {
            super.removeItem(item);
        }

    }

    //IDを使ってアイテムを検索する
    findItemById(itemId) {
        return this._list.find((item) => item.id == itemId);
    }
}