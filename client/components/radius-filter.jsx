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
    this.editRadiusFilter = this.editRadiusFilter.bind(this);
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

  editRadiusFilter(e) {
    const input = e.target.value;
    this.setState({
      radiusFilter: input
    });
  }

  render() {
    const filter = this.state.radiusFilter;

    if (!this.state.editFilterMode) {
      return (
        <div
          className='d-flex justify-content-between align-mid px-3'
          onClick={this.setEditFilterView}>
          <img src='images/filter-icon.svg' className='filter-icon'></img>
          <input type='range' value={filter} min={1} max={24.8} onChange={this.editRadiusFilter}/>
          {/* 24.8 miles is Yelp's maximum radius value */}
        </div>
      );
    } else {
      return (
        <div className='d-flex justify-content-between align-mid focus-darken px-3'>
          <input type='range' value={filter} min={1} max={24.8} onChange={this.editRadiusFilter}/>
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
