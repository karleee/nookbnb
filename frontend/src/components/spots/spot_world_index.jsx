import React from 'react';
import { withRouter } from 'react-router-dom';

class SpotWorldIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { spots } = this.props;

    return (
      <div className="world-container"> 
        <div className="breezy-hollow-wrapper">
          <div className="image-wrapper">
            {/* <img src='/images/homepage/breezy_hollow.png' /> */}
          </div>
          <p>Breezy Hollow</p>
        </div>

        <div className="lost-lure-creek-wrapper">
          <div className="image-wrapper">
            {/* <img src='/images/homepage/lost_lure_creek.png' /> */}
          </div>
          <p>Lost Lure Creek</p>
        </div>

        <div className="saltwater-shores-wrapper">
          <div className="image-wrapper">
            {/* <img src='/images/homepage/saltwater_shores.png' /> */}
          </div>
          <p>Saltwater Shores</p>
        </div>

        <div className="sunburst-island-wrapper">
          <div className="image-wrapper">
            {/* <img src='/images/homepage/sunburst_island.png' /> */}
          </div>
          <p>Sunburst Island</p>
        </div>
      </div>
    );
  }
}

export default withRouter(SpotWorldIndex);