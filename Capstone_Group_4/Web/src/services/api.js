function Api() {
    this.fectData = function () {
        const promise = axios({
            url: "https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone",
            method: "GET",
        });
        return promise;
    };
    this.filterProduct = function (value, listData) {
        let mangCungHang = [];
        for (let i = 0; i < listData.length; i++) {
            const product = listData[i];
            if (product.type === value) {
                mangCungHang.push(product);
            }
        }
        return mangCungHang;
    }
}

function DSGH(){
    this.mangGioHang = [];
    this.themVaoGioHang = function(product){
        this.mangGioHang.push(product);
    };
}