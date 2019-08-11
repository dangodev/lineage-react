import React, { SyntheticEvent } from 'react';

import * as Styled from './styles';

interface CartItemProps {
  lineItem: ShopifyCustom.LineItem;
  removeLineItem: (id: number | string) => void;
  updateLineItem: (input: ShopifyBuy.AttributeInput) => void;
}

const CartItem: React.FunctionComponent<CartItemProps> = ({
  lineItem,
  removeLineItem,
  updateLineItem,
  ...props
}) => {
  if (!lineItem) {
    return null;
  }

  const productType = (lineItem.productType && lineItem.productType.toLowerCase()) || '';
  const featuredImage = lineItem.variant.image
    ? lineItem.variant.image.src
    : lineItem.images[0].src;

  const color =
    (lineItem.metafields && lineItem.metafields.c_f && lineItem.metafields.c_f.color) || undefined;

  const shouldShowVariant =
    ['default title', 'title'].indexOf(lineItem.variant.title.toLowerCase()) === -1;

  let subscriptionInterval = '';
  let subscriptionUnit = '';

  if (productType.indexOf('subscription') >= 0) {
    const interval = lineItem.customAttributes.find(
      ({ key }: { key: string }) => key === 'shipping_interval_frequency'
    );
    const unit = lineItem.customAttributes.find(
      ({ key }: { key: string }) => key === 'shipping_interval_unit_type'
    );
    if (interval) {
      subscriptionInterval = interval.value;
    }
    if (unit) {
      subscriptionUnit = unit.value;
    }
  }

  const clickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm(`Remove ${lineItem.title}?`)) {
      removeLineItem(lineItem.id);
    }
  };

  return (
    <Styled.Container {...props}>
      <Styled.ThumbContainer color={color}>
        <Styled.Thumb src={featuredImage} alt={lineItem.title} />
      </Styled.ThumbContainer>
      <Styled.ProductInfo>
        <Styled.Heading>
          {lineItem.title}
          {productType.indexOf('subscription') >= 0 &&
            ` (Every ${subscriptionInterval} ${
              subscriptionInterval === '1'
                ? subscriptionUnit.substr(0, subscriptionUnit.length - 1)
                : subscriptionUnit
            })`}
          {shouldShowVariant && ` (${lineItem.variant.title})`}
        </Styled.Heading>
        <Styled.ProductType>{lineItem.productType}</Styled.ProductType>
        <Styled.Description>
          {(productType === 'coffee' || productType === 'coffee beans') && (
            <Styled.Notes>{lineItem.tags.map(({ value }) => value).join(' / ')}</Styled.Notes>
          )}
        </Styled.Description>
        <Styled.Price>${lineItem.variant.price}</Styled.Price>
      </Styled.ProductInfo>
      <Styled.QuantityLabel>
        <Styled.Quantity
          defaultValue={lineItem.quantity.toString()}
          min="0"
          onChange={e => {
            // eslint-disable-next-line no-alert
            if (parseInt(e.target.value, 10) === 0 && confirm(`Remove ${lineItem.title}?`)) {
              removeLineItem(lineItem.id);
            } else if (e.target.value) {
              updateLineItem({
                id: lineItem.id,
                quantity: parseInt(e.target.value, 10),
              });
            }
          }}
          type="number"
        />
        {productType === 'coffee' || productType === 'coffee beans' ? 'bags' : 'count'}
        <Styled.Remove onClick={clickHandler}>Remove</Styled.Remove>
      </Styled.QuantityLabel>
    </Styled.Container>
  );
};

export default CartItem;
