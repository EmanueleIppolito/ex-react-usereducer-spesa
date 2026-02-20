import { useReducer } from 'react'

const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

const cartReducer = (cart, action) => {
  switch (action.type) {
    
    case "ADD_ITEM": {
      const product = action.payload
      const existingProduct = cart.find(
        (item) => item.name === product.name
      )
      
      if (!existingProduct) {
        return [...cart, { ...product, quantity: 1 }]
      } else {
        return cart.map((item) =>
          item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item

      )
    }
  }
    case "REMOVE_ITEM": {
      const productName = action.payload
      return cart.filter((item) => item.name !== productName)
    }

    case "UPDATE_QUANTITY": {
      const {name, quantity} = action.payload
      const parsed = parseInt(quantity, 10)
      const safeQuantity = Math.max(1, Number.isNaN(parsed) ? 1 : parsed)
      return cart.map((item) => 
      item.name === name
    ? {...item, quantity: safeQuantity}
    : item)

    }
  default:
    return cart
  }
}

function App() {
  
  
 const [addedProducts, dispatch] = useReducer(cartReducer, [])
 const addToCart = (product) => {
  dispatch({ type: "ADD_ITEM", payload: product })
}
  const removeFromCart = (productName) => {
  dispatch({type: "REMOVE_ITEM", payload: productName})
}
  const updateProductQuantity = (productName, newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {name: productName, quantity: newQuantity}
    })
      
  }
  const total = addedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
          {addedProducts.map((item) =>
           (<li key= {item.name}>{item.name}, Numero articoli: <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateProductQuantity(item.name, e.target.value)
              }
            />
 € {(item.price * item.quantity).toFixed(2)}<button onClick={() => removeFromCart(item.name)}> Elimina dal Carrello </button></li>))}
        </ul>
        <h2>Totale:</h2>
        <p><strong>€{total.toFixed(2)}</strong></p>
        </>
        }
      </div>
    </>
  )
}

export default App
