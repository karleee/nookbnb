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
        <div className="spot-index-world-paris">
          <p>Put thumbnail image here</p>
          <p>Paris</p>
        </div>

        <div className="spot-index-world-new-york">
          <p>Put thumbnail image here</p>
          <p>New York</p>
        </div>

        <div className="spot-index-world-sydney">
          <p>Put thumbnail image here</p>
          <p>Sydney</p>
        </div>

        <div className="spot-index-world-cape-town">
          <p>Put thumbnail image here</p>
          <p>Cape Town</p>
        </div>
      </div>
    );
  }
}

export default withRouter(SpotWorldIndex);