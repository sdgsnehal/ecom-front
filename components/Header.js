import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Center from "./Center";
const StyleHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StlyedNav = styled.nav`
  display: flex;
  gap: 15px;
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;
const Header = () => {
  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href="/">BNT</Logo>
          <StlyedNav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All Product</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/cart">Cart (0)</NavLink>
          </StlyedNav>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
};

export default Header;
