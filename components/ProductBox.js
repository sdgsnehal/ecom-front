import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
const ProductWrapper = styled.div``;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  align-item: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
  align-items: center;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
export default function ProductBox({ _id, title, description, images, price }) {
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox>
        <div>
          <img src={images[0][0]} alt="product" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline={1}>
            Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
