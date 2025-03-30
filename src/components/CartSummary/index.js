// Write your code here
import {Component} from 'react'

import Popup from 'reactjs-popup'



import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {
    paymentMethod: '',
    orderPlaced: false,
  }

  handlePaymentChange = event => {
    this.setState({paymentMethod: event.target.value})
  }

  handleConfirmOrder = () => {
    const {paymentMethod} = this.state
    if (paymentMethod === 'Cash on Delivery') {
      this.setState({orderPlaced: true})

      // Close the popup after 2 seconds
      setTimeout(() => {
        this.setState({paymentMethod: '', orderPlaced: false})
      }, 4000)
    }
  }

  resetPopup = () => {
    this.setState({paymentMethod: '', orderPlaced: false})
  }

  render() {
    const {paymentMethod, orderPlaced} = this.state

    return (
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

              {/* Checkout Button with Popup */}

              <Popup
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
                modal
                nested
                closeOnDocumentClick={false}
                onClose={this.resetPopup}
              >
                {close => (
                  <div className="popup-container">
                    <h2>Select Payment Method</h2>
                    <div className="payment-options">
                      <label>
                        <input
                          type="radio"
                          value="Card"
                          disabled
                          checked={paymentMethod === 'Card'}
                          onChange={this.handlePaymentChange}
                        />
                        Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Net Banking"
                          disabled
                          checked={paymentMethod === 'Net Banking'}
                          onChange={this.handlePaymentChange}
                        />
                        Net Banking
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="UPI"
                          disabled
                          checked={paymentMethod === 'UPI'}
                          onChange={this.handlePaymentChange}
                        />
                        UPI
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Wallet"
                          disabled
                          checked={paymentMethod === 'Wallet'}
                          onChange={this.handlePaymentChange}
                        />
                        Wallet
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Cash on Delivery"
                          checked={paymentMethod === 'Cash on Delivery'}
                          onChange={this.handlePaymentChange}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="summary-container">
                      <h3>Order Summary</h3>
                      <p className="total-amount-text">Items: {cartLength}</p>
                      <h3 className="total-amount-text">
                        Order Total:{' '}
                        <span className="total-amount">{count}/-</span>
                      </h3>
                    </div>

                    {orderPlaced ? (
                      <p className="success-message">
                        Your order has been placed successfully!
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={this.handleConfirmOrder}
                        disabled={paymentMethod !== 'Cash on Delivery'}
                      >
                        Confirm Order
                      </button>
                    )}
                    <button
                      type="button"
                      className="close-button"
                      onClick={close}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
