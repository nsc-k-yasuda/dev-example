class SyainView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(syain) {
        return `<tr class="syain">
        <td>${syain.id}</td>
        <td>${syain.firstName}</td>
        <td>${syain.name}</td>
        <td>${syain.phoneNumber}</td>
        <td>${syain.mail}</td>
      </tr>`
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