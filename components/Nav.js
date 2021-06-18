import Link from 'next/Link';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const {openCart} = useCart();
  return (
    <NavStyles>
      <Link href="/vehicles">Vehicles</Link>
      {user && (
        <>
          <Link href="/discover">Discover</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Order</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={openCart}> My Cart </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}