function Validation() {
    this.kiemTraRong = function (value, spanId, massage) {
        if (value === "") {
            getEle(spanId).innerHTML = massage;
            return false;
        }
        getEle(spanId).innerHTML = "";
        return true;
    };
    this.kiemTraChuoiKyTu = function (value, spanId, massage) {
        const letter = "^[a-zA-Z0-9 ]+$";
        if (value.match(letter)) {
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = massage;
        return false;
    };

    this.kiemTraChuoiSo = function (value, spanId, massage) {
        const number = /^[0-9]+$/;
        if (value.match(number)) {
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).innerHTML = massage;
        return false;
    };
    // this.kiemTraTenSPTonTai = function (value, spanId, massage, listData) {
    //     let exist = false;
    //     for (let i = 0; i < listData.length; i++) {
    //         const product = listData[i];
    //         if (value === product.name) {
    //             exist = true;
    //             break;
    //         }
    //     }
    //     if (exist) {
    //         getEle(spanId).innerHTML = massage;
    //         return false;
    //     }
    //     getEle(spanId).innerHTML = "";
    //     return true;

    // };
}