import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPrice } from '../../util/format';

import {
  Container,
  Products,
  Product,
  ProductInfos,
  ProductImage,
  ProductDetailed,
  ProductTitle,
  ProductPrice,
  ProductDeletion,
  ProductIncrementDecrement,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyCart,
  EmptyCartText,
} from './styles';
import colors from '../../styles/colors';

function Cart({ products, total, dispatch }) {
  return (
    <Container>
      {products.length ? (
        <>
          <Products>
            {products.map(product => (
              <Product key={product.id}>
                <ProductInfos>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetailed>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetailed>
                  <ProductDeletion
                    onPress={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', id: product.id })
                    }
                  >
                    <Icon
                      name="delete-forever"
                      size={24}
                      color={colors.primary}
                    />
                  </ProductDeletion>
                </ProductInfos>
                <ProductIncrementDecrement>
                  <ProductControlButton>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton>
                    <Icon
                      name="add-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductIncrementDecrement>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyCart>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyCartText>Seu carrinho está vazio.</EmptyCartText>
        </EmptyCart>
      )}
    </Container>
  );
}

// Get state from Redux (item added to cart from Main page) and turn it into a prop, in order to manipulate the data
const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
    priceFormatted: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

export default connect(mapStateToProps)(Cart);
