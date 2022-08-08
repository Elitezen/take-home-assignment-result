import './Header.scss';
import IconShoppingCart from '../../icons/shopping_cart.svg';

type HeaderProps = {
  openCart: () => void;
}

export default function Header({
  openCart
}:HeaderProps) {
  return (
    <header>
      <h1>Example</h1>

      <nav>
        <ul>
          <li>
            <button onClick={() => openCart()}>
              <img 
                src={IconShoppingCart} 
                alt="Shopping Cart" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}