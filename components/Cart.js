import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import CloseButton from './styles/CloseButton';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { vehicle } = cartItem;
  if (!vehicle) return null;
  console.log(vehicle);
  return (
    <CartItemStyles>
      <img
        width="100"
        src={vehicle.photo.image.publicUrlTransformed}
        alt={vehicle.name}
      />
      <div>
        <h3>{vehicle.name}</h3>
        <p>
          {formatMoney(vehicle.price * cartItem.quantity)} |
          <em>
            Quantity: {cartItem.quantity} &times; {formatMoney(vehicle.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const {cartOpen, closeCart} = useCart();
  if (!me) return null;
  console.log(me);
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      <CloseButton type="button" onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
