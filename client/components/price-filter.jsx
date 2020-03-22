import React from 'react';

class PriceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFilterMode: false,
      priceFilter: [false, false, false]
    };

    this.setEditFilterView = this.setEditFilterView.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.setPriceFilter = this.setPriceFilter.bind(this);
  }

  setEditFilterView() {
    this.setState({
      editFilterMode: true
    });
  }

  doneEditing() {
    this.props.setFilters({ priceFilter: this.state.priceFilter });
    this.setState({
      editFilterMode: false
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
    const filters = this.state.priceFilter;
    const isActiveClass = filters.map(filter => filter ? '' : ' dollar-light');

    if (!this.state.editFilterMode) {
      return (
        <div
          className='d-flex justify-content-between align-mid px-3'
          onClick={this.setEditFilterView}>
          <img src='images/filter-icon.svg' className='filter-icon'></img>
          <span className={'dollar' + isActiveClass[0]}>$</span>
          <span className={'dollar' + isActiveClass[1]}>$$</span>
          <span className={'dollar' + isActiveClass[2]}>$$$</span>
        </div>
      );
    } else {
      return (
        <div className='d-flex justify-content-between align-mid focus-darken px-3'>
          <span onClick={() => this.setPriceFilter(0)} className={'dollar' + isActiveClass[0]}>$</span>
          <span onClick={() => this.setPriceFilter(1)} className={'dollar' + isActiveClass[1]}>$$</span>
          <span onClick={() => this.setPriceFilter(2)} className={'dollar' + isActiveClass[2]}>$$$</span>
          <span
            onClick={this.doneEditing}
            className='check' >
            &#10004;
          </span>
        </div>
      );
    }
  }
}

export default PriceFilter;
