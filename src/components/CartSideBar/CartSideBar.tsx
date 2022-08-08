import { Cart } from '../../types';

import CartProduct from './CartProduct/CartProduct';
import './CartSideBar.scss';

type CartSideBarProps = {
  data: Cart;
  setData: React.Dispatch<React.SetStateAction<Cart>>;
};

export default function CartSideBar({
  data,
  setData
}:CartSideBarProps) {
  const dataArr = Array.from(data.values());
  const totalCost = dataArr.reduce((prev, curr) => {
    return prev + parseFloat(curr.totalCost());
  }, 0);

  return (
    <aside>
      <div className="container">
        <h1>Cart</h1>
        {
          data.size > 0
          ? (<ul>
            {
              dataArr.map((data, i) => {
                return (
                  <li key={i}>
                    <CartProduct data={data} removeItem={() => removeItemFromCart(data.prodId)}/>
                  </li>
                )
              })
            }
          </ul>) : <p className='empty-cart'>Nothing To Show</p>
        }
        {
          data.size > 0 
          ? (
            <div className="footer">
              <p>Total: $<strong>{totalCost}</strong></p>
              <button>
                <p>Proceed To Checkout</p>
              </button>
            </div>
          ) : ''
        }
      </div>
    </aside>
  )

  function removeItemFromCart(prodId:number) {
    if (!data.has(prodId) || !window.confirm('Remove item from cart?')) return;
    const newData = new Map(data);

    newData.delete(prodId);
    setData(newData);
  }
}