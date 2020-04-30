import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from './utils/storage';
import Client from './Contentful';
// import $ from 'jquery';
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
      filteredProducts: [],
      sortedCart: [],
      rating: 0,
      cart: [],
      quantity: 0,
      size: "",
      email: '',
      inCart: false,
      order: [],
      count: 0,
      total: 0,
      cartSubtotal: 0,
      cartTax: 0,
      cartTotal: 0,
      // "bracelet": false,
      // ring: false,
      // earring: false,
    };
    // this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);

  };

  async getData() {
    try {
      let response = await Client.getEntries({
        content_type: 'ss',
        order: 'sys.createdAt'
        //oredr:'-field.price'
      });
      let products = this.formatData(response.items);
      let newArrivals = products.filter(product => product.newArrival === true);
      // console.log("New Arrivals", newArrivals);

      this.setState({
        products: products,
        loading: false,
        filteredProducts: products,
        newArrivals,
        loading: false,

      });
    } catch (error) {
      // console.log(error);
    }
  }


  componentDidMount() {
    this.getData();
    this.getUserInfo();
    this.recoverCart();
    // console.log(process.env.REACT_APP_STRIPE_TOKEN);
  }


  formatData(items) {
    let tempProducts = items.map(item => {
      let id = item.fields.id;
      let images = item.fields.images.map(image =>
        image.fields.file.url
      );
      let product = { ...item.fields, images, id };
      return product;
    });
    return tempProducts;
  };

  getProduct = (id) => {
    let tempProducts = [...this.state.products];
    const product = tempProducts.find((product) => product.id == id);
    return product;
  }

  handleChange = event => {
    var name = event.target.name;
    // var value = event.target.value;
    // var type = event.target.type;

    //size
    // if (type == "radio") {
    //   this.setState({
    //     size: value
    //   }, () => {
    //     // console.log("size2", this.state.size);
    //   });
    // }

    // rating
    if (!name) {
      const rating = event.target.className;
      var num = 1;
      if (rating.includes("raStar_5")) { num = 5 };
      if (rating.includes("raStar_4")) { num = 4 };
      this.setState({
        rating: num
      }, this.filterProduct);
    } else {
      // category
      switch (name) {
        case 'bracelet':
          this.setState({
            bracelet: true, ring: false, earring: false
          }, this.filterProduct
          );
          break;
        case 'ring':
          this.setState({
            bracelet: false, ring: true, earring: false
          }, this.filterProduct
          );
          break;
        case 'earring':
          this.setState({
            bracelet: false, ring: false, earring: true
          }, this.filterProduct
          );
          break;
      }

    }
  }

  filterProduct = () => {
    let tempProducts = this.state.products;
    let bracelet = this.state.bracelet;
    let ring = this.state.ring;
    let earring = this.state.earring;
    let rating = this.state.rating;

    if (rating === 5) {
      tempProducts = tempProducts.filter(product => product.rating === 5)
    } else if (rating === 4) {
      tempProducts = tempProducts.filter(product => product.rating === 4)
    } else if (rating < 4 && rating > 0) {
      tempProducts = tempProducts.filter(product => product.rating < 4)
    }

    if (bracelet) {
      tempProducts = tempProducts.filter(product => product.bracelet === true);
    }
    if (ring) {
      tempProducts = tempProducts.filter(product => product.ring === true);
    }
    if (earring) {
      tempProducts = tempProducts.filter(product => product.earring === true);
    }
    // return tempProducts;
    this.setState({
      filteredProducts: tempProducts
    });
  }

  clearFilter = () => {
    this.setState({
      filteredProducts: this.state.products,
      rating: 0
    })
  }

  sortByPrice = () => {
    let products = this.state.filteredProducts;
    var mapped = products.map(function (el, i) {
      return { index: i, value: el.price };
    })
    mapped.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    var tempProducts = mapped.map(function (el) {
      return products[el.index];
    });
    this.setState({
      filteredProducts: tempProducts
    })
  }

  sortByRating = () => {
    let products = this.state.filteredProducts;
    var mapped = products.map(function (el, i) {
      return { index: i, value: el.rating };
    })
    mapped.sort((a, b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));
    var tempProducts = mapped.map(function (el) {
      return products[el.index];
    });
    this.setState({
      filteredProducts: tempProducts
    })
  }

  sortCart = (cart) => {
    const ids = [...new Set(cart.map(obj => obj.id))]
    let sortedCart = [];
    ids.map(id => {
      const length = cart.filter(product => product.id == id).length;
      const result = cart.find(product => product.id == id);
      if(length >= 1){
        result.count = length;
      }
      sortedCart.push(result);
    });
    this.setState({
      sortedCart: sortedCart
    });
  }

  addToCart = (id) => {
    let itemAddToCart = this.getProduct(id);
    const price = itemAddToCart.price;
    itemAddToCart.inCart = true;
    itemAddToCart.count = 1;
    itemAddToCart.total = price;
    this.setState(() => {
      return { cart: [...this.state.cart, itemAddToCart] }
    }
      , () => {
        this.sortCart(this.state.cart);
        this.sendCartItem();
        this.addTotals();
      }
    );
  }

  //receive user cart items when logged in
  receiveCartItem = (cart) => {
    this.setState({
      cart: cart
    }, () => {
      this.addTotals();
      this.sortCart(this.state.cart);
    });
  }

  // send cart data to backend
  sendCartItem = () => {
    let obj = getFromStorage('jewelry_app');
    if (obj && obj.token) {
      let token = obj.token;
      let firstName = obj.firstName;
      let lastName = obj.lastName;
      let email = obj.email;
      let cart = this.state.cart;
      if (token && email) {
        setInStorage('jewelry_app', { token: token, firstName: firstName, lastName: lastName, cart: this.state.cart, email: email, order: this.state.order });
        fetch('/api/account/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart,
            email: email
          }),
        }).then(res => res.json())
          .then(json => {
            // // console.log('update json', json);
            if (json.success) {
              this.setState({
                signUpError: json.message,
                isLoading: false,
              });
            } else {
              this.setState({
                signUpError: json.message,
                isLoading: false,
              });
            }
          });
      }
    }
  }

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (
      subTotal += item.total
    ));
    const tempTax = subTotal * 0.13;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total
      }
    });
  }

  increment = (id) => {
    let tempItemsInCart = [...this.state.cart];
    let selectedItem = tempItemsInCart.find(item => item.id === id);
    this.setState(() => {
      return {
        cart: [...tempItemsInCart, selectedItem]
      }
    }, () => {
      this.addTotals();
      this.sendCartItem();
      this.sortCart(this.state.cart);
    });
  }

  decrement = (id) => {
    let tempItemsInCart = [...this.state.cart];
    const index = tempItemsInCart.findIndex(product => product.id === id);
    tempItemsInCart.splice(index, 1);
    this.setState(() => {
      return {
        cart: [...tempItemsInCart]
      }
    }, () => {
      this.addTotals();
      this.sendCartItem();
      this.sortCart(this.state.cart);
    });
  }

  removeItem = (id) => {
    let tempItemsInCart = [...this.state.cart];
    tempItemsInCart = tempItemsInCart.filter(item => item.id !== id);

    let removedItem = this.getProduct(id);
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState(() => {
      return {
        cart: [...tempItemsInCart]
      }
    }, () => {
      this.addTotals();
      this.sendCartItem();
      this.sortCart(this.state.cart);
    });


  }

  clearCart = () => {
    let tempItemsInCart = [...this.state.cart];
    tempItemsInCart.map(item => item.inCart = false);
    this.setState(() => {
      return { cart: [], sortedCart: [] };
    }, () => {
      this.addTotals();
    })
  }

  checkSignIn = () => {
    const obj = getFromStorage('jewelry_app');
    if (obj && obj.token) {
      return true
    } else {
      return false
    }
  }

  recoverCart = () => {
    const obj = getFromStorage('jewelry_app');
    if (obj && obj.order) {
      const order = obj.order;
      // console.log(order.length);
      const cart = this.state.cart;
      if (order.length > 0) {
        if (!obj.payment || obj.payment == "cancelled") {

          // console.log("payment cancelled");
          order.map((product) => {
            cart.push(product);
          });
          this.setState({
            cart: cart
          }, () => {
            this.sendCartItem();
            this.addTotals();
          });
        }
      }

    }
  }

  getUserInfo = () => {
    const obj = getFromStorage('jewelry_app');
    if (obj && obj.token) {
      const firstName = obj.firstName;
      const lastName = obj.lastName;
      const email = obj.email;
      const cart = obj.cart;
      this.setState({
        firstName,
        lastName,
        email,
        cart: cart,
      }, () => {
        this.sortCart(this.state.cart);
        this.addTotals();
      });
    }
  }

  checkout = () => {
    const tempItemsInCart = this.state.sortedCart;
    const tempProducts = this.state.cart;
    const items = tempItemsInCart.map(item => ({
      quantity: item.count,
      sku: item.sku
    }));
    this.setState({
      cart: [],
      order: tempProducts
    }, () => { this.sendCartItem() });
    const stripe = window.Stripe(process.env.REACT_APP_STRIPE_TOKEN);
    // console.log("checkout clicked");
    stripe.redirectToCheckout({
      items: items,
      successUrl: 'https://ssjewelry.shanruan.io/success',
      cancelUrl: 'https://ssjewelry.shanruan.io/canceled',
      // customerEmail: this.state.email
    });
  }

  render() {
    return (
      <ProductContext.Provider value={{
        products: this.state.products,
        loading: this.state.loading,
        ...this.state,
        getProduct: this.getProduct,
        clearFilter: this.clearFilter,
        sortByPrice: this.sortByPrice,
        sortByRating: this.sortByRating,
        handleChange: this.handleChange,
        addToCart: this.addToCart,
        receiveCartItem: this.receiveCartItem,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart,
        checkSignIn: this.checkSignIn,
        checkout: this.checkout,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
