// Write your code here
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const cartLength = cartList.length

      let count = 0

      cartList.forEach(each => {
        count += each.price * each.quantity
        return count
      })

      console.log(count)

      return (
        <div className="cart-summery-container">
          <div className="count-container">
            <h1 className="total-amount-text">
              Order Total: <span className="total-amount">{count}/-</span>
            </h1>
            <p className="items-count">{cartLength} Items in cart</p>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
