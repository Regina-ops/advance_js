const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    searchText: '',
    filteredProducts: []
  },
  methods: {
    getJson(url){
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },

    addProduct(product) {
      console.log(product);
    }
  },

    search () {
      let text = this.saerchText.toLowerCase().trim();
      if (text === '') {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((el) => {
          return el.product_name.toLowerCase().includes(text);
        });
      }
    },
    // я примерно понимаю как это должно выглядеть, но реализовать не могу.
    /*cartOn() {
      if (cart-btn == 'mouseover') {
        cart-btn.style.isVisible = 'true',
      },
    },
*/
  beforeCreate() {

  },

  created() {
    this.getJson(`${API + this.catalogUrl}`)
        .then((data) => {
          console.log(data);
          this.products = data;
        });
  },

  beforeMount() {

  },

  mounted() {

  },

  beforeUpdate() {

  },

  updated() {

  },

  beforeDestroy() {

  },

  destroyed() {

  },
});
