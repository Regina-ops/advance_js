const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise! Дальше НЕ ИСПОЛЬЗОВАТЬ!!!
/* let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};
*/
const promise = new Promise((resolve, reject) => {
  onreadystatechange(() => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        resolve('Error');
      }
      else {
        reject(xhr.responseText);
      }
    }
  });
  });

// –--------------------------------

class ProductList {
  #goods;
  #allProducts;
  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    this.#getProducts()
        .then((data) => {
          this.#goods = data;
          this.#render();
        });
    // this.#fetchGoods();
    // this.#render();
  }

  sum() {
    return this.#allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  // #fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log('response')
  //     // console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     // console.log(this.#goods);
  //   });
  // }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
  }

  #render() {
    console.log('render')
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
    this.quantity = 1;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const catalog = new ProductList();

//Создание корзины
class Cart {
  constructor () {
      this.goods = [];
  }

  render () {
      let listHtml = '';
      let goodsList = document.getElementById('allProducts');      
      this.goods.forEach ((ProductItem, indexOfProduct) => {
          listHtml += ProductItem.renderWithIndex(indexOfProduct);
      });
      goodsList.innerHTML = listHtml;
      this.totalCartPrice();
  }

// Добавление товара в корзину

addItemToCart(product) {
  let ProductItem = this.goods.filter(el => el.title == product.title)[0]

  if (ProductItem != undefined) {
      ProductItem.addQuantity();
  } else { 
      let item = new ProductItem(product);
      this.goods.push(item);
  }
};




// class ProductList {
//   constructor(container = '.products') {
//     this.container = container;
//     this._goods = [];
//     this._allProducts = [];
//
//     this._fetchGoods();
//     this._render();
//   }
//
//   _fetchGoods() {
//     this._goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   _render() {
//     const block = document.querySelector(this.container);
//
//     for (let product of this._goods) {
//       const productObject = new ProductItem(product);
//
//       this._allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
//
// class ProductItem {
//   constructor(product, img='https://via.placeholder.com/200x150') {
//     this.title = product.title;
//     this.price = product.price;
//     this.id = product.id;
//     this.img = img;
//   }
//
//   render() {
//     return `<div class="product-item" data-id="${this.id}">
//               <img src="${this.img}" alt="Some img">
//               <div class="desc">
//                   <h3>${this.title}</h3>
//                   <p>${this.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//   }
// }
//
// const catalog = new ProductList();
// catalog.fetchGoods();
// catalog.render();
