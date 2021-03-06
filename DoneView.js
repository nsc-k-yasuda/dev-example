
class DoneView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(syain) {
        return ``;
    }

    update(syainList) {
        //todoListのアイテム1個ごとにtemplateでHTMLを作成
        let content = '';

        syainList.forEach(syain => {
            content += this.template(syain);
        });

        //elementのinnerHTMLに入れる
        this._element.innerHTML = content;
    }
}