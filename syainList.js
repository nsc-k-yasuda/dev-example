//TODOリストを表す
class SyainList extends BaseList {

    constructor() {
        super();
    }

    get count() {
        return this._list.length;
    }

    get list(){
         return this._list;
    }

    addSyain(syain) {
        super.addSyain(syain);
    }

    addAll(newList){
        super.addAll(newList);
    }

    removeItem(syain) {
        super.removeItem(syain);
    }

    //IDを使ってTODOを検索する
    findItemById(itemId){
        return this._list.find((item) => item.id == itemId);
    }

    //IDを使ってアイテムを削除する
    removeItemById(itemId){
        
        let item = this.findItemById(itemId);

        if(item) {
            this.removeItem(item);
        }

    }
}