import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { set } from "mongoose";
import React, { use, useContext, useEffect, useState } from "react";
import styled from "styled-components";
const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #fofofo;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;
const QuantityBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const CartPage = () => {
  const { cartProducts, addProducts, removeProducts, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);
  function moreOfThisProduct(id) {
    addProducts(id);
  }
  function lessOfThisProduct(id) {
    removeProducts(id);
  }
  async function goToPayment() {
    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  console.log(isSuccess);
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnWrapper>
            <Box>
              <h1>Thanks for your Order</h1>
              <p>We will email you when your order will be sent</p>
            </Box>
          </ColumnWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} />
                        </ProductImageBox>
                        {product.title}:
                      </ProductInfoCell>
                      <td>
                        <QuantityBox>
                          <Button
                            onClick={() => {
                              lessOfThisProduct(product._id);
                            }}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </QuantityBox>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total: ${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>

              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button block black size={"l"} onClick={goToPayment}>
                Continue to Payment
              </Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
};

export default CartPage;
