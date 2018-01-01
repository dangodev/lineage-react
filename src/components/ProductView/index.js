import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import parse from "url-parse";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/throttleTime";

import Button from "components/Button";
import CoffeeData from "components/CoffeeData";
import Waves from "components/Waves";
import Styled from "./styles";

const maximumQuantity = 5;

class ProductView extends React.Component {
  constructor(props) {
    super(props);

    const quantities = [];
    for (var n = 1; n <= maximumQuantity; n += 1) {
      quantities.push(n);
    }

    this.state = {
      quantities,
      quantity: 1,
      selectedInterval: "1",
      selectedVariant: {}
    };

    this.getSubscriptionIntervals = this.getSubscriptionIntervals.bind(this);
    this.isCoffee = this.isCoffee.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.setOption = this.setOption.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.shouldShowSubscriptions = this.shouldShowSubscriptions.bind(this);
  }

  componentWillMount() {
    this.setDefaultVariant(this.props);
    if (typeof window !== "undefined") {
      this.keydown$ = Observable.fromEvent(window, "keydown")
        .throttleTime(16)
        .subscribe(e => this.keydownHandler(e));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultVariant(nextProps);
    this.setState({ quantity: 1 }); // go back to 1 quantity on product change
  }

  componentWillUnmount() {
    if (this.keydown$) {
      this.keydown$.unsubscribe();
    }
  }

  addLineItem(e) {
    if (e) {
      e.preventDefault();
    }

    let lineItem = {
      variantId: this.state.selectedVariant.id,
      quantity: this.state.quantity
    };

    if (this.shouldShowSubscriptions()) {
      lineItem.customAttributes = [
        {
          key: "shipping_interval_frequency",
          value: this.state.selectedInterval
        },
        {
          key: "shipping_interval_unit_type",
          value: this.props.product.metafields.subscriptions
            .shipping_interval_unit_type
        },
        {
          key: "subscription_id",
          value: this.props.product.metafields.subscriptions.subscription_id
        }
      ];
    }

    this.props.addLineItem(lineItem);
    this.props.history.push("/cart");
  }

  close(e) {
    e.preventDefault();
    this.props.history.push(this.props.returnTo);
  }

  getFlavor() {
    if (
      !this.props.product ||
      !this.props.product.metafields.c_f ||
      !this.props.product.metafields.c_f.color
    )
      return "pink";
    return this.props.product.metafields.c_f.color;
  }

  getSubscriptionIntervals() {
    return (
      this.props.product.metafields.subscriptions["shipping_interval_frequency"]
        .replace(/\s/g, "")
        .split(",") || []
    );
  }

  isCoffee() {
    if (!this.props.product) return false;
    return (
      ["coffee", "coffee beans"].indexOf(
        this.props.product.productType.toLowerCase()
      ) !== -1
    );
  }

  isSelectedOption({ name, value }) {
    if (!this.props.product || !this.state.selectedVariant) return false;

    return this.state.selectedVariant.selectedOptions.find(
      option => option.name === name && option.value === value
    );
  }

  keydownHandler(e) {
    if (e.keyCode === 27) {
      this.close(e);
    }
  }

  setDefaultVariant(nextProps) {
    if (!nextProps.product) return false;

    if (nextProps.product.variants.length === 1) {
      return this.setState({ selectedVariant: nextProps.product.variants[0] });
    }

    const variantID = parse(window.location.href, true).query.variant;
    const selectedVariant =
      nextProps.product.variants.find(
        ({ id }) => id === parseInt(variantID, 10)
      ) || nextProps.product.variants[0];

    this.setState({
      selectedVariant: selectedVariant || nextProps.product.variants[0]
    });
  }

  setOption(name, value) {
    function isShallowEqual(v, o) {
      for (var key in v) {
        if (!(key in o) || v[key] !== o[key]) {
          return false;
        }
      }

      for (var key in o) {
        if (!(key in v) || v[key] !== o[key]) {
          return false;
        }
      }

      return true;
    }

    const options = {
      ...this.state.selectedOptions,
      [name]: value
    };

    const selectedVariant =
      this.props.product.variants.find(variant =>
        isShallowEqual(
          options,
          variant.selectedOptions.reduce(
            (a, b) => ({ ...a, [b.name]: b.value }),
            {}
          )
        )
      ) || this.props.product.variants[0];

    this.setState({
      selectedOptions: options,
      selectedVariant
    });

    this.props.history.replace(
      `${this.props.location.pathname}?variant=${selectedVariant.id}`
    );
  }

  setQuantity(quantity) {
    this.setState({ quantity });
  }

  setSelectedInterval(interval) {
    this.setState({ selectedInterval: `${interval}` });
  }

  shouldShowVariants() {
    if (!this.props.product) return false;

    return (
      this.props.product.options.length > 0 &&
      this.props.product.options[0].values.length > 1
    );
  }

  shouldShowSubscriptions() {
    return (
      this.props.product &&
      this.props.product.productType.toLowerCase().indexOf("subscription") >= 0
    );
  }

  render() {
    return (
      <Styled.Container isShowing={this.props.isShowing}>
        {this.props.product && (
          <Styled.Grid>
            <Styled.Modal isShowing={this.props.isShowing}>
              <Styled.Image>
                <img
                  alt={this.props.product.title}
                  src={this.props.product.images[0].src}
                />
              </Styled.Image>
              <Styled.Close
                href={this.props.returnTo}
                onClick={e => this.close(e)}
              >
                ✕
              </Styled.Close>
              <Styled.Info>
                <Styled.CoreInfo>
                  <Styled.Heading>{this.props.product.title}</Styled.Heading>
                  {this.isCoffee() && (
                    <div>
                      <Styled.Subheading>Notes</Styled.Subheading>
                      <Styled.Notes>
                        {this.props.product.tags
                          .map(note => note.value)
                          .join(", ")}
                      </Styled.Notes>
                    </div>
                  )}
                  <Styled.Subheading>Description</Styled.Subheading>
                  <Styled.Description
                    dangerouslySetInnerHTML={{
                      __html: this.props.product.descriptionHtml
                    }}
                  />
                </Styled.CoreInfo>
                {this.isCoffee() && (
                  <CoffeeData metafields={this.props.product.metafields} />
                )}
              </Styled.Info>
              <Styled.Selections>
                {this.shouldShowVariants() &&
                  this.props.product.options.map(option => (
                    <div key={option.id}>
                      <Styled.Subheading>{option.name}</Styled.Subheading>
                      <Styled.OptionList>
                        {option.values.map((value, index) => (
                          <Styled.Option key={value}>
                            <input
                              type="radio"
                              id={`${option.id}-${index}`}
                              name={option.id}
                              defaultChecked={this.isSelectedOption({
                                name: option.name,
                                value: value.value
                              })}
                              onChange={() =>
                                this.setOption(option.name, value.value)
                              }
                              value={value.value}
                            />
                            <label htmlFor={`${option.id}-${index}`}>
                              {value.value}
                            </label>
                          </Styled.Option>
                        ))}
                      </Styled.OptionList>
                    </div>
                  ))}
                {this.shouldShowSubscriptions() && (
                  <div>
                    <Styled.Subheading>Ship Every:</Styled.Subheading>
                    <Styled.OptionList>
                      {this.getSubscriptionIntervals().map(interval => (
                        <Styled.Option key={`week-${interval}`}>
                          <input
                            type="radio"
                            id={`week-${interval}`}
                            name="subscription-interval"
                            defaultChecked={
                              interval === this.state.selectedInterval
                            }
                            onChange={() => this.setSelectedInterval(interval)}
                            value={interval}
                          />
                          <label htmlFor={`week-${interval}`}>
                            {interval} Week{interval !== "1" ? "s" : ""}
                          </label>
                        </Styled.Option>
                      ))}
                    </Styled.OptionList>
                  </div>
                )}
                <Styled.Subheading>Quantity</Styled.Subheading>
                <Styled.Quantity>
                  <Styled.OptionList>
                    {this.state.quantities.map(quantity => (
                      <Styled.Option key={quantity}>
                        <input
                          type="radio"
                          id={`quantity-${quantity}`}
                          name="quantity"
                          defaultChecked={quantity === this.state.quantity}
                          onChange={() => this.setQuantity(quantity)}
                          value={quantity}
                        />
                        <label htmlFor={`quantity-${quantity}`}>
                          {quantity}
                        </label>
                      </Styled.Option>
                    ))}
                    {/* {this.isCoffee() &&
                      <Styled.QuantityWholesale>
                        Need more? Try 5lb bags, or <Link to="/pages/wholesale">wholesale</Link>.
                      </Styled.QuantityWholesale>
                    } */}
                  </Styled.OptionList>
                </Styled.Quantity>
              </Styled.Selections>
              <Styled.Price>${this.state.selectedVariant.price}</Styled.Price>
              <Styled.Actions>
                <Waves width="42.5%" />
                <Button onClick={e => this.addLineItem(e)}>Add to Cart</Button>
              </Styled.Actions>
            </Styled.Modal>
          </Styled.Grid>
        )}
        <Styled.Overlay
          flavor={this.getFlavor()}
          href={this.props.returnTo}
          isShowing={this.props.isShowing}
          onClick={e => this.close(e)}
        />
      </Styled.Container>
    );
  }
}

ProductView.defaultProps = {
  isShowing: false,
  product: undefined,
  returnTo: "\\"
};

ProductView.propTypes = {
  addLineItem: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isShowing: PropTypes.bool,
  location: PropTypes.object.isRequired,
  product: PropTypes.object,
  returnTo: PropTypes.string
};

export default withRouter(ProductView);
