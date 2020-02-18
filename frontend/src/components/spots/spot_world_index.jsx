import React from 'react';
import { withRouter } from 'react-router-dom';
import SpotWorldIndexItem from './spot_index_item';

class SpotWorldIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { spots } = this.props;

    return (
      <div className="spot-index-world-regions">
        <div className="spot-index-world-breezy-hollow">
          <div className="image-wrapper">
            <img src='/images/homepage/breezy_hollow.png' />
          </div>
          <p>Breezy Hollow</p>
        </div>

        <div className="spot-index-world-lost-lure-creek">
          <div className="image-wrapper">
            <img src='/images/homepage/lost_lure_creek.png' />
          </div>
          <p>Lost Lure Creek</p>
        </div>

        <div className="spot-index-world-saltwater-shores">
          <div className="image-wrapper">
            <img src='/images/homepage/saltwater_shores.png' />
          </div>
          <p>Saltwater Shores</p>
        </div>

        <div className="spot-index-world-sunburst-island">
          <div className="image-wrapper">
            <img src='/images/homepage/sunburst_island.png' />
          </div>
          <p>Sunburst Island</p>
        </div>
      </div>
    );
  }
}

export default withRouter(SpotWorldIndex);