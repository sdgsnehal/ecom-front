import React from "react";
import Center from "./Center";
import styled from "styled-components";
const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;
const Featured = () => {
  return (
    <Bg>
      <Center>
        <h1>Pro anywhere</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitat
        </p>
      </Center>
    </Bg>
  );
};

export default Featured;
