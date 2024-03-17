const api = new Api();

const validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTin() {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const image = getEle("HinhSP").value;
  const screen = getEle("screen").value;
  const backCamera = getEle("backcamera").value;
  const frontCamera = getEle("frontcamera").value;
  const description = getEle("MoTa").value;
  const type = getEle("type").value;


  let isVaLid = true;
  //1. kiểm tra sản phẩm

  isVaLid &= validation.kiemTraRong(name, "spanTenSP", "(*) Tên sp không được trống") && validation.kiemTraChuoiKyTu(name, "spanTenSP", "(*)Tên sp phải la chữ hoặc số");

  isVaLid &= validation.kiemTraRong(price, "spanGiaSP", "(*) giá sp không được trống") && validation.kiemTraChuoiSo(price, "spanGiaSP", "(*)Tên sp là chữ số");

  isVaLid &= validation.kiemTraRong(image, "spanHinhSP", "(*) Hình sp không được trống");

  if (!isVaLid) return null;
  const product = new Product("", name, price, screen, backCamera, frontCamera, image, description, type);
  return product;
}

//lấy danh sách sản phẩm từ cơ sở dữ liệu
function getListProduct() {
  const promise = api.fecthData();
  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

// && kiemTraTrungTen(name, "spanTenSP", "(*) Tên sp không được trùng")
// function kiemTraTrungTen(value, spanId, massage) {
//   const promise = api.fecthData();
//   promise
//     .then(function (result) {
//       let ketqua = false;
//       ketqua = validation.kiemTraTenSPTonTai(value, spanId, massage, result.data);
//     })
//     .catch(function (error) { });
// }


function renderUI(data) {
  let content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>

            <td>
                <img src="./../../assets/image/${product.image}" width="50" >
            </td>
            <td>${product.screen}</td>

            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger " onclick = "deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = content;
}
//sắp xếp tăng theo giá sp
function sapXepTangTheoGia() {
  let mangGiaTang = [];
  let mangSPTangTheoGia = [];
  api.fecthData()
    .then(function (result) {
      mangGiaTang = api.sapXepTangTheoGia(result.data);
      for (let i = 0; i < result.data.length; i++) {
        for (let j = 0; j < result.data.length; j++) {
          const product = result.data[j];
          if(Number(product.price) === mangGiaTang[i]){
            mangSPTangTheoGia.push(product);
          }
        }
      }
      renderUI(mangSPTangTheoGia);

    })
    .catch(function (error) { });
}

function sapXepGiamTheoGia(){
  let mangGiaGiam = [];
  let mangSPGiamTheoGia = [];
  api.fecthData()
    .then(function (result) {
      mangGiaGiam = api.sapXepGiamTheoGia(result.data);
      for (let i = 0; i < result.data.length; i++) {
        for (let j = 0; j < result.data.length; j++) {
          const product = result.data[j];
          if(Number(product.price) === mangGiaGiam[i]){
            mangSPGiamTheoGia.push(product);
          }
        }
      }
      renderUI(mangSPGiamTheoGia);

    })
    .catch(function (error) { });
}
/**
 * thêm sp
*/
getEle("btnThemSP").onclick = function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  const btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
}

function addProduct() {
  const product = layThongTin();
  const promise = api.add(product);
  promise
    .then(function (result) {
      document.getElementsByClassName("close")[0].onclick;
      getListProduct();
    })
    .catch(function (error) { })
}
/**
 * delete Product
*/
function deleteProduct(id) {
  const promise = api.detele(id);
  promise
    .then(function (result) {
      getListProduct();
    })
    .catch(function (error) {
    });
}

/**
 * edit product
*/
function editProduct(id) {
  //change title model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  //creat button "Update Product"
  const btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})"> Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      // show thông tin ra ngoài
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("HinhSP").value = product.image;
      getEle("screen").value = product.screen;
      getEle("backcamera").value = product.backCamera;
      getEle("frontcamera").value = product.frontCamera;
      getEle("MoTa").value = product.description;
      getEle("type").value = product.type;
    })
    .catch(function (error) { });

}
/**
 * update product
*/
function updateProduct(id) {
  const product = layThongTin();
  product.id = id;
  const promise = api.upDate(product);
  promise
    .then(function (result) {
      getListProduct();
      document.getElementsByClassName("close")[0].onclick;
    })
    .catch(function (error) { });
}

/**
 * search product
*/
getEle("txtSearch").addEventListener("keyup", function () {
  const promise = api.fecthData();
  promise
    .then(function (result) {
      const keyword = getEle("txtSearch").value;
      const mangTimKiem = api.SearchProduct(keyword, result.data);
      renderUI(mangTimKiem);

    })
    .catch(function (error) { })
})
