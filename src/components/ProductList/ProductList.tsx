import { useEffect, useRef, useState } from 'react';

import { Product, ProductSorting } from '../../types';
import IconSort from '../../icons/sort.svg';

import StagedProduct from './StagedProduct/StagedProduct';
import UnstagedProduct from './UnstagedProduct/UnstagedProduct';
import './ProductList.scss';

type ProductListProps = {
  products: Product[];
  addItemToCart: (product:Product, quantity: number) => void;
};

export default function ProductList({
  products,
  addItemToCart
}:ProductListProps) {
  const [stagedProduct, setStagedProduct] = useState(products[0]);
  const [unstagedProducts, setUnstagedProducts] = useState(products.slice(1, products.length));
  const [displayUnstagedProducts, setDisplayUnstagedProducts] = useState(generateUnstaged(unstagedProducts));

  const ref = useRef<HTMLElement>(null);
  const CONFIRM_DELETE = () => window.confirm('Delete Item?');

  useEffect(() => {
    setDisplayUnstagedProducts(generateUnstaged(unstagedProducts));
  }, [unstagedProducts]);

  function generateUnstaged(data:Product[]) {
    return (
      data.map((data, i) => (
        <li key={i}>
          <UnstagedProduct 
            data={data} 
            onClick={() => stageDifferentProduct(data.prodId)}
            deleteProduct={deleteUnstagedProduct}/>
        </li>
      ))
    )
  }

  const Sort = () => (
    <div className="sort">
      <figure className="sort-header">
        <img src={IconSort} alt="Sort Products" />
          <figcaption>
            <p>Sort By</p>
          </figcaption>
        </figure>

        <div className="sort-options">
          <div>
            <input 
              type="radio" 
              name="sort_by"
              id="price"
              onClick={() => setDisplayUnstagedProducts(
                generateUnstaged(sortUnstagedBy(unstagedProducts, 'price')
              ))}/>
            <label htmlFor="sort"><p>Price</p></label>
          </div>
          <div>
            <input 
              type="radio" 
              name="sort_by"
              id="caption"
              onClick={() => setDisplayUnstagedProducts(
                generateUnstaged(sortUnstagedBy(unstagedProducts, 'caption')
              ))}/>
            <label htmlFor="sort"><p>Caption</p></label>
          </div>
          <div>
            <input 
              type="radio" 
              name="sort_by"
              id="brand"
              onClick={() => setDisplayUnstagedProducts(
                generateUnstaged(sortUnstagedBy(unstagedProducts, 'brand')
              ))}/>
            <label htmlFor="sort"><p>Brand</p></label>
          </div>
        </div>
    </div>
  );

  return (
    <main ref={ref}>
      {
        stagedProduct !== null
        ? (
          <StagedProduct 
            data={stagedProduct} 
            deleteProduct={() => deleteStagedProduct()}
            addItemToCart={addItemToCart}/>
        ) 
        : <p id="empty-staged">Nothing To Show</p>
      }

      <div className="unstaged-products-container">
        {
          unstagedProducts.length
          ? (
            <>
              <h2>More Like This</h2>
              <Sort />
              <ul>
                {
                  displayUnstagedProducts
                }
              </ul>
            </>
          )
          : ''
        }
      </div>
    </main>
  )

  function stageDifferentProduct(prodId:number) {
    const indexOfToStage = unstagedProducts
      .findIndex(p => p.prodId === prodId);
    const toStage = unstagedProducts[indexOfToStage];
    if (toStage === undefined) return;

    setStagedProduct(toStage);
    setUnstagedProducts(current => {
      let newUnstaged = [];

      // Copied by spread to be able to mutate
      newUnstaged = [...current];
      newUnstaged[indexOfToStage] = stagedProduct;

      return newUnstaged;
    });

    ref.current?.scrollIntoView();
  }

  function deleteUnstagedProduct(prodId:number) {
    if (CONFIRM_DELETE()) {
      setUnstagedProducts(current => current.filter(p => p.prodId !== prodId));
    } 
  }

  function deleteStagedProduct() { 
    if (CONFIRM_DELETE()) {
      setStagedProduct(unstagedProducts[0] || null);
      setUnstagedProducts(current => current.slice(1, current.length));
    }
  }

  function sortUnstagedBy(products:Product[], arg: ProductSorting):Product[] {
    if (arg === 'price') {
      return products.sort((a, b) => a.price - b.price);
    } else {
      return products.sort((a, b) => {
        const textA = a[arg].toUpperCase();
        const textB = b[arg].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
  }
}