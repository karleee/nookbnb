import React from 'react';
import { withRouter } from 'react-router-dom';

class SpotDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  // Rendering component
  render() {
    const { spot } = this.props;

    return (
      <div className="spot-index-item-detail-wrapper">
        <h1>{spot.name}</h1>
      </div>
    );
  }
}

export default withRouter(SpotDetail);