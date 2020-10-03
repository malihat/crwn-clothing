export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => 
    cartItem.id === cartItemToAdd.id);

  // if its alreay in the cart
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem )
  }
  // if not in cart
  return [...cartItems, {...cartItemToAdd, quantity: 1}]
}  