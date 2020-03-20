import React from 'react';
import { render } from 'sass';

class PriceFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editFilterMode: false,
      priceFilter: [false, false, false]
    };
  }

  setEditFilterView() {
    this.setState({
      editFilterMode: true
    });
  }

  setPriceFilter(index) {
    const newFilter = Array.from(this.state.priceFilter);
    newFilter[index] = !newFilter[index];
    this.setState({
      priceFilter: newFilter
    });
  }

  render() {
    const focusFilter = this.state.editFilterMode ? ' focus-shadow' : '';

    if (!this.state.editFilterMode) {
      return (
        <div
          className={'d-flex flex-justify-between' + focusFilter}
          onClick={this.setEditFilterView}>
          <span>$</span>
          <span>$$</span>
          <span>$$$</span>
        </div>
      );
    } else {
      return (
        <div className={'d-flex flex-justify-between' + focusFilter}>
          <span onClick={() => this.setPriceFilter(0)}>$</span>
          <span onClick={() => this.setPriceFilter(1)}>$$</span>
          <span onClick={() => this.setPriceFilter(2)}>$$$</span>
        </div>
      );
    }
  }
}

export default PriceFilter;
