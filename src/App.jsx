import { useState } from 'react'
import { useReducer } from 'react'

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  const [count, setCount] = useState(0)
  const [addedProducts, setAddedProducts] = useState([])

  const addToCart = (product) => {
    const existingProduct = addedProducts.find((item => item.name === product.name))
    if(!existingProduct){
      setAddedProducts([...addedProducts, {...product, quantity: 1}])
    }
  }

  return (
    <>
      <div>
        <h1>Lista della spesa</h1>
        <h2>Prodotti</h2>
        <ul>
          {products.map((product) => (<li key={product.name}>{product.name} € {product.price.toFixed(2)}<button onClick={() => addToCart(product)}>Aggiungi al Carrello</button></li>))}
        </ul>
        {addedProducts.length > 0 &&
        <>
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((product) => (<li key= {product.name}>{product.name}, Numero articoli: <strong>{product.quantity}</strong></li>))}
        </ul>
        </>
        }
      </div>
    </>
  )
}

export default App
