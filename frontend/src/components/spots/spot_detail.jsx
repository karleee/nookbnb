import React from 'react';
import { withRouter } from 'react-router-dom';

class SpotDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  // Rendering component
  render() {
    const { spotId } = this.props;

    return (
      <div className="spot-index-item-detail-wrapper">
        <h1>{spotId}</h1>
      </div>
    );
  }
}

export default withRouter(SpotDetail);