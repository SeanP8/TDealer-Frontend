import Link from 'next/Link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    background: red;
    a{
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        padding: .5rem 1rem;
    }
`;

const HeaderStyles = styled.header`
    .bar{
        border-bottom: 10px solid var(--black, black);
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
    }

    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 2px solid var(--black, black);
    }
`;

export default function Header() {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link href="/">Tesla dealer</Link>
                </Logo>
                
            <Nav/>
            </div>
            <div className="sub-bar">
                <p>Search</p>
                <Cart />
            </div>
        </HeaderStyles>
    )
};