function Api() {
    //lấy ds từ server
    this.fecthData = function () {
        const promise = axios({
            url: "https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone",
            method: "GET",
        });
        return promise;
    };
    this.detele = function (id) {
        const promise = axios({
            url: `https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone/${id}`,
            method: "DELETE",
        });
        return promise;
    };
    this.add = function (product) {
        const promise = axios({
            url: "https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone",
            method: "POST",
            data: product
        });
        return promise;
    };


    this.getProductById = function (id) {
        const promise = axios({
            url: `https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone/${id}`,
            method: "GET",
        });
        return promise;
    }
    this.upDate = function (product) {
        const promise = axios({
            url: `https://65e1954aa8583365b316c3c7.mockapi.io/api/CapstonePhone/${product.id}`,
            method: "PUT",
            data: product
        });
        return promise;
    }

    this.SearchProduct = function (keyword, listData) {
        let mangTimKiem = [];
        for (let i = 0; i < listData.length; i++) {
            const product = listData[i];
            const keywordLowerCase = keyword.toLowerCase();
            const tenspLowerCase = product.name.toLowerCase();
            if (tenspLowerCase.indexOf(keywordLowerCase) !== -1) {
                mangTimKiem.push(product);
            }
        }
        return mangTimKiem;
    }
    this.sapXepTangTheoGia = function (listData) {
        let mangGiaTang = [];
        for(let i =0; i < listData.length; i++){
            let number = Number(listData[i].price);
            mangGiaTang.push(number);
        }
        mangGiaTang.sort(function(a,b){
            return a - b;
        });
        return mangGiaTang;
        
    }

    this.sapXepGiamTheoGia = function (listData) {
        let mangGiaGiam = [];
        for(let i =0; i < listData.length; i++){
            let number = Number(listData[i].price);
            mangGiaGiam.push(number);
        }
        mangGiaGiam.sort(function(a,b){
            return b-a;
        });
        return mangGiaGiam;
        
    }
}