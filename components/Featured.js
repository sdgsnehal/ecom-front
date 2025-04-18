import React, { useContext } from "react";
import Center from "./Center";
import styled from "styled-components";
import Image from "next/image";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  Image {
    max-width: 100%;
  }
  div {
    align-items: center;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
const Featured = ({ product }) => {
  const { addProducts } = useContext(CartContext);
  function addFeaturedToCart() {
    addProducts(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={"/products" + product._id}
                  white={1}
                  outline={1}
                >
                  Read more
                </ButtonLink>
                <Button white={1} onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <Image
              width={300}
              height={300}
              alt="macbook"
              src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"
            />
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
