import { useState } from 'react';
import $ from 'jquery';

import { Cart, Product } from './types';
import data from './ListJSONTest.json';

import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartSideBar from './components/CartSideBar/CartSideBar';
import ShadowWrapper from './components/ShadowWrapper/ShadowWrapper';
import './App.scss';

const { List:productList } = data;

function App() {
  const [products] = useState<Product[]>(productList);
  const [cartProducts, setCartProducts] = useState<Cart>(new Map());

  return (
    <>
      <ShadowWrapper clearScreen={clearScreen}/>
      <Header openCart={openCart}/>
      <CartSideBar data={cartProducts} setData={setCartProducts}/>
      <ProductList products={products} addItemToCart={addItemToCart}/>
    </>
  );

  function openCart() {
    $('aside')
      .css('right', 0);
    $('#wrapper')
      .css('display', 'block');
  }

  function closeCart() {
    $('aside')
      .css('right', '-300px');
    $('#wrapper')
      .css('display', 'none');
  }

  function clearScreen() {
    closeCart();
  }

  function addItemToCart(product:Product, amount: number) {
    if (amount <= 0) return;
    
    const productInCart = cartProducts.get(product.prodId);

    if (productInCart) {
      if ((productInCart.quantity + amount) > product.maxOrderQuantity) {
        const remainingQuantity = product.maxOrderQuantity - productInCart.quantity;

        return window
          .alert(`You can only order ${remainingQuantity} more`);
      }

      productInCart.quantity += amount;
      cartProducts.set(product.prodId, productInCart);

      const newCart = new Map(cartProducts);
      setCartProducts(newCart);
    } else {
      if (amount > product.maxOrderQuantity) {
        return window
          .alert(`You can only order a maximum of ${product.maxOrderQuantity}`);
      }

      cartProducts.set(product.prodId, { 
        ...product,

        quantity: amount,
        totalCost: function() {
          return (this.price * this.quantity).toFixed(2);
        }
      });

      const newCart = new Map(cartProducts);
      setCartProducts(newCart);
    }
  }
}

export default App;

// By Alejandro Muratalla-Marin