import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { css } from 'glamor';
import glamorous from 'glamorous';

import { color, font, grid, layer } from '../lib/theme';

/**
 * Template
 */

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    const productType = this.props.product.type.toLowerCase();

    this.state = {
      isCoffee: productType === 'coffee' || productType === 'coffee beans',
    };

    this.goBack.bind(this);
  }

  componentWillMount() {
    document.body.classList.add(IsShowing);
    window.addEventListener('keydown', e => this.goBack(e));
  }

  componentWillUnmount() {
    document.body.classList.remove(IsShowing);
    window.removeEventListener('keydown', e => this.goBack(e));
  }

  goBack(e) {
    if (e.keyCode === 27) {
      this.props.history.push(this.props.returnTo);
    }
  }

  render() {
    return (
      <Container>
        <Grid>
          <Modal>
            <Close to={this.props.returnTo}>✕</Close>
            <Heading>{this.props.product.title}</Heading>
            {this.state.isCoffee && [
              <Subheading>Notes</Subheading>,
              <Notes>{this.props.product.tags.join(', ')}</Notes>,
            ]}
            <Subheading>Description</Subheading>
            {/* <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} /> */}
            {this.state.isCoffee &&
              <Deets>
                <Subheading>Deets</Subheading>
                <Stats>
                  <Key>Elevation</Key>
                  <Value>{this.props.product.metafields.elevation}</Value>
                  <Key>Origin</Key>
                  <Value>{this.props.product.metafields.country}</Value>
                  <Key>Farm</Key>
                  <Value>{this.props.product.metafields.grower}</Value>
                  <Key>Variety</Key>
                  <Value>{this.props.product.metafields.variety}</Value>
                  <Key>Size</Key>
                  <Value>{this.props.product.metafields.size}</Value>
                  <Key>Process</Key>
                  <Value>{this.props.product.metafields.processing_method}</Value>
                  <Key>Freshness Peak</Key>
                  <Value>{this.props.product.metafields.peak_flavor}</Value>
                </Stats>
              </Deets>
            }
          </Modal>
        </Grid>
        <Overlay to={this.props.returnTo} flavor={this.props.product.metafields.color} />
      </Container>
    );
  }
}

ProductView.defaultProps = {
  returnTo: '\\',
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
  returnTo: PropTypes.string,
};

/**
 * Styles
 */

const Container = glamorous.div({
  height: '100vh',
  left: 0,
  overflowY: 'scroll',
  position: 'fixed',
  right: 0,
  top: 0,
  WebkitOverflowScrolling: 'touch',
});

const Grid = glamorous.div({
  marginBottom: 2 * grid,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 2 * grid,
  maxWidth: `calc(100vw - ${grid}px)`,
  width: '75vw',
  zIndex: layer.modal + 1,
});

const Modal = glamorous.div({
  backgroundColor: `rgb(${color.white})`,
  display: 'block',
  paddingLeft: '25%',
  paddingBottom: 1.5 * grid,
  paddingRight: 1.5 * grid,
  paddingTop: grid,
  position: 'relative',
  zIndex: layer.modal + 1,
});

const Close = glamorous(Link)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'grid',
  fontSize: 28,
  fontWeight: 500,
  height: 2 * grid,
  justifyContent: 'center',
  lineHeight: 1,
  position: 'absolute',
  right: 0,
  textDecoration: 'none',
  top: 0,
  width: 2 * grid,
  zIndex: layer.base,
});

const Overlay = glamorous(Link)(
  {
    backgroundColor: `rgba(${color.black}, 0.4)`,
    cursor: 'pointer',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: layer.modal,
  },
  ({ flavor = 'black' }) => ({
    backgroundColor: `rgba(${color[flavor]}, 0.7)`,
  })
);

const Heading = glamorous.h1({
  fontSize: font.up3,
  lineHeight: 1,
  marginBottom: 0.5 * grid,
  marginTop: 0,
  textTransform: 'uppercase',
});

const Subheading = glamorous.h3({
  fontSize: font.down2,
  letterSpacing: '0.075em',
  marginBottom: 0,
  marginTop: 0.5 * grid,
  textTransform: 'uppercase',
});

const Notes = glamorous.p({
  fontSize: font.down1,
  lineHeight: 1.5,
  marginBottom: 0,
  marginTop: 0,
  textTransform: 'capitalize',
});

const Deets = glamorous.div({
  backgroundColor: `rgb(${color.offwhite})`,
  padding: grid,
  position: 'absolute',
  right: 0,
  top: 0,
  width: '32.5%',
});

const Stats = glamorous.dl({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: font.down2,
  justifyContent: 'space-apart',
});

const Key = glamorous.dt({
  fontWeight: 500,
  margin: 0,
  paddingTop: 0.25 * grid,
  width: '50%',
});

const Value = glamorous.dd({
  margin: 0,
  paddingTop: 0.25 * grid,
  textAlign: 'right',
  width: '50%',
});

/* State */

const IsShowing = css({
  height: '100vw',
  overflow: 'hidden',
});

export default withRouter(ProductView);
