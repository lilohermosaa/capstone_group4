const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}

function showInput() {
  // let ketqua = "";
  // ketqua = getEle("mySelect").value;
  // return ketqua;
}

function getListProduct() {

  const promise = api.fectData();
  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) { });
  }
  getListProduct();

getEle("mySelect").addEventListener("change", function () {
  let valueSelect = getEle("mySelect").value;
  api.fectData()
    .then(function (result) {
      let mangCungHang = [];
const listProduct = result.data;
      if (valueSelect === "all") {
        mangCungHang = result.data;
      } else{
        mangCungHang = listProduct.filter((product) => product.type === valueSelect)
        // else (valueSelect === "samsung" || valueSelect === "iphone") 
        // Product(valueSelect, result.data)
      } renderUI(mangCungHang);
    })
    .catch(function (error) { });
});

function renderUI(data) {
  let content = "";
  data.forEach(function (product) {
      content += `
          <div class="col-12 col-md-6 col-lg-4">
              <div class="card cardPhone">
                  <img src="./image/${product.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <div class="d-flex justify-content-between">
                          <div>
                              <h3 class="cardPhone__title">${product.name}</h3>
                              <span class="cardPhone__text">$${product.price}</span>
                              <span class="cardPhone__text">${product.backCamera}</span>
                              <span class="cardPhone__text">${product.frontCamera}</span>
                              <span class="cardPhone__text">${product.description}</span>
                          </div>
                      </div>
                      <div class=" justify-content-between">
                          <div>
                              <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="btnPhone-shadow btn btn-primary"><i class="fa fa-shopping-cart"></i> Thêm Vào Giỏ Hàng</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  });

  document.getElementById("products_content_main").innerHTML = content;
}

// function showInput() {
//     let loaiKhachHang = document.getEle("dropdown_content").value;
//     if (loaiKhachHang == "samsung") {
//         document.getEle("samsung").style.display = "block";
//         document.getEle("iphone").style.display = "none";
//     } else if (loaiKhachHang == "iphone") {
//         document.getEle("iphone").style.display = "block";
//         document.getEle("samsung").style.display = "none";

//     }
// }
