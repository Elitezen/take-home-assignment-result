import { MouseEventHandler } from 'react';

import { Product } from '../../../types';
import IconDelete from '../../../icons/delete.svg';
import styles from './UnstagedProduct.module.scss';

type UnstagedProductProps = {
  data: Product;
  onClick: MouseEventHandler<HTMLDivElement>;
  deleteProduct: (prodId:number) => void;
}

export default function UnstagedProduct({
  data,
  onClick,
  deleteProduct
}: UnstagedProductProps) {
  return (
    <div className={styles.product}>
      <figure onClick={onClick}>
        <img src={data.mediumImageURL} alt="Product" />

        <figcaption>
          <p><strong>{data.brand}</strong> {data.caption}</p>
        </figcaption>
      </figure>

      <p className={styles.available}>
          <strong>
            {
              data.isAvailable 
              ? 'Available'
              : 'Out of stock'
            }
          </strong>
        </p>

      <div className={styles.footer}>
        <p className={styles.price}>
          <strong>{data.currency}{data.price}</strong>
        </p>

        <button onClick={() => deleteProduct(data.prodId)}>
          <img src={IconDelete} alt="Delete Product" />
        </button>
      </div>
    </div>
  );
}