export default function calcTotalPrice(cart) {
    return cart.reduce((tally, cartItem) => {
      if (!cartItem.vehicle) return tally; // vehicles can be deleted, but they could still be in your cart
      return tally + cartItem.quantity * cartItem.vehicle.price;
    }, 0);
  }
  