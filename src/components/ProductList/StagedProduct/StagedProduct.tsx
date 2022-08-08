import { useEffect } from 'react';
import $ from 'jquery';

import { Product } from '../../../types';
import IconDelete from '../../../icons/delete.svg';

import styles from './StagedProduct.module.scss';


type StagedProductProps = {
  data: Product;
  deleteProduct: () => void;
  addItemToCart: (product:Product, quantity: number) => void;
}

export default function StagedProduct({
  data,
  deleteProduct,
  addItemToCart
}: StagedProductProps) {

  useEffect(parseHTMLEntities, []);

  function parseHTMLEntities() {
    $('#staged-product-description')
      .html(data.description)
      .text();
  }

  parseHTMLEntities();

  return (
    <div className={styles.stage}>
      <div className={styles.product}>
        <div className={styles.information}>
          <div className={styles.textContainer}>
            <p className={styles.brand}>{data.brand}</p>
            <h3 className={styles.title}>
              <strong>{data.productLink.rel}</strong>
            </h3>
            <figure>
              <img src={data.imageURL} alt="Product Display"/>
            </figure>

            {
              data.hasFullDescription 
              ? <>
                  <p 
                  className={styles.description} 
                  id="staged-product-description">
                    {data.description}
                  </p>
                  <br />
                  <a href={data.productUrl} target="_blank">Visit Product Page</a>
                </>
              : ''
            }

            <strong>
              <p className={styles.price}>
                {data.currency}
                <strong>{data.price}</strong>
              </p>
            </strong>

            <div className={styles.inputRow}>
              <input 
                name="quantity" 
                id="quantity"
                type="number"
                defaultValue={1}
                placeholder='QTY'/>
                
              <button onClick={() => {
                const qty = $('#quantity').val();
                if (!qty || Array.isArray(qty) /* Type gaurd against string[] */) return;

                addItemToCart(data, parseInt(qty as string));
                window.alert('Item added!')
              }}>
                <p>
                  {
                    data.isAvailable 
                    ? 'Add to Cart'
                    : <strong>Out of Stock</strong>
                  }
                </p>
              </button>

              <button className={styles.delete} onClick={() => deleteProduct()}>
                <img src={IconDelete} alt="Delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}