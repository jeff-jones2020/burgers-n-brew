import React from 'react';

class RadiusFilter extends React.Component {
  constructor(props) {
    super(props);
    const radiusFilter = props.currentRadiusFilter
      ? props.currentRadiusFilter
      : 15;
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
    this.props.setFilters({ currentRadiusFilter: this.state.radiusFilter });
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
          className="d-flex justify-content-between align-mid"
          onClick={this.setEditFilterView}
        >
          <img src="images/filter-icon.svg" className="filter-icon"></img>
          <input
            id="radius-range"
            type="range"
            value={filter}
            min={1}
            max={24.8}
            onChange={this.setEditFilterView}
          />
          <div id="mile-label">{filter} mi.</div>
          {/* 24.8 miles is Yelp's maximum radius value */}
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-around align-mid focus-darken px-3">
          <div id="edit-mile-label" className="mx-auto">
            {filter} mi.
          </div>
          <input
            id="radius-range"
            name="miles"
            type="range"
            value={filter}
            min={1}
            max={24.8}
            className="mx-3"
            onChange={this.editRadiusFilter}
          />
          <span onClick={this.doneEditing} className="check ml-2">
            &#10004;
          </span>
        </div>
      );
    }
  }
}

export default RadiusFilter;
