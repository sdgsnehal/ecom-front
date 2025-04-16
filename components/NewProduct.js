import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap:20px;
  padding-top:20px;
`;
const NewProduct = ({ products }) => {
  return (
    <Center>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </ProductGrid>
    </Center>
  );
};

export default NewProduct;
