import { primary } from "@/lib/colors";
import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
export const ButtonStyle = css`
  background-color: rgb(85, 66, 246);
  border: 0;
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family:'Roboto';
  font-weight: 700;
  svg {
    height: 16px;
  }
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}
      ${(props) =>
        props.primary &&
        props.outline &&
        css`
          background-color: transparent;
          border: 1px solid ${primary};
          color: ${primary};
        `}

  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 26px;
      }
    `}
`;
const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
