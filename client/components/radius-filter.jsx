import React from 'react';

class RadiusFilter extends React.Component {
  constructor(props) {
    super(props);
    const radiusFilter = props.radiusFilter ? props.radiusFilter : 15;
    this.state = {
      editFilterMode: false,
      radiusFilter: radiusFilter
    };

    this.setEditFilterView = this.setEditFilterView.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.toggleradiusFilter = this.toggleradiusFilter.bind(this);
  }

  setEditFilterView() {
    this.setState({
      editFilterMode: true
    });
  }

  doneEditing() {
    this.props.setFilters({ radiusFilter: this.state.radiusFilter });
    this.setState({
      editFilterMode: false
    });
  }

  toggleradiusFilter(index) {
    const newFilter = Array.from(this.state.radiusFilter);
    newFilter[index] = !newFilter[index];
    this.setState({
      radiusFilter: newFilter
    });
  }

  render() {
    const filters = this.state.radiusFilter;
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
          <span onClick={() => this.toggleradiusFilter(0)} className={'dollar' + isActiveClass[0]}>$</span>
          <span onClick={() => this.toggleradiusFilter(1)} className={'dollar' + isActiveClass[1]}>$$</span>
          <span onClick={() => this.toggleradiusFilter(2)} className={'dollar' + isActiveClass[2]}>$$$</span>
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

export default RadiusFilter;
