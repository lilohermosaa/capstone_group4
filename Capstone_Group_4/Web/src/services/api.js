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
// tao danh sach gio hang 

function cartItem(_id, _name, _price, _image) {
    return {
        id: _id,
        name: _name,
        price: _price,
        image: _image,
        quantity: 1
    };
}

function DSGH() {
    this.mangGioHang = [];
    this.hienthiCart = function cartItem(_id, _name, _price, _image) {
    };
    this.addToCart = function (cartItem) {
        this.mangGioHang.push(cartItem);
        hienthiCart(cartItem);
    };
}

const dsgH = new DSGH();

// function addToCart(id, name, price, image) {
//     const newItem = cartItem(id, name, price, image);
//     dsgH.addToCart(newItem, hienthiCart);
// }
function hienthiCart() {
  
    let cartElement = document.getElementById("tbodyCart");
    cartElement.innerHTML = "";

    
    dsgH.mangGioHang.forEach(function (cartItem) {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card", "mb-3");

        cardElement.innerHTML = `
            <img src="${cartItem.image}" class="card-img-top" alt="${cartItem.name}">
            <div class="card-body">
                <h5 class="card-title">${cartItem.name}</h5>
                <p class="card-text">Price: $${cartItem.price}</p>
                <p class="card-text">Quantity: ${cartItem.quantity}</p>
            </div>
        `;

        cartElement.appendChild(cardElement);
    });
}
function addToCart(id, name, price, image) {
    // item ton tai trong cart
    const existingItem = dsgH.mangGioHang.find(item => item.id === id);
    if (existingItem) {
        // tang sluong len neu ton tai
        existingItem.quantity++;
    } else {
        // o ton tai  thi them 1 sl
        const newItem = cartItem(id, name, price, image);
        dsgH.addToCart(newItem);
    }
    // cap nhat cart 
    hienthiCart();
}
