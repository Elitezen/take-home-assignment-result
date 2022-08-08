import { ProductInCart } from '../../../types';
import IconDelete from '../../../icons/delete.svg';

import styles from './CartProduct.module.scss';

type CartProductProps = {
  data: ProductInCart;
  removeItem: () => void;
}

export default function CartProduct({
  data,
  removeItem
}:CartProductProps) {
  return (
    <div className={styles.product}>
      <figure>
        <img src={data.mediumImageURL} alt="Product in Cart" />
        <figcaption><p>
          {data.productLink.rel.slice(0, 40)}...  
        </p></figcaption>
      </figure>

      <div className={styles.bottomRow}>
        <div className={styles.orderData}>
          <p>
            Quantity: <strong>{data.quantity} </strong> 
          </p>

          <p>
            Sum: <strong>${data.totalCost()}</strong>  
          </p>
        </div>
        
        <button onClick={() => removeItem()}>
          <img src={IconDelete} alt="Remove From Cart" />
        </button>
      </div>
    </div>
  )
}