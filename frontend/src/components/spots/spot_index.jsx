import React from 'react';
import { withRouter } from 'react-router-dom';

import SpotWorldIndex from './spot_world_index';
import SpotIndexItem from './spot_index_item';
import Footer from '../footer/footer';

import '../../assets/stylesheets/spot_index.css';

class SpotIndex extends React.Component {
  // Constructor for SpotIndex
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    }
  }

  // Runs once component is mounted
  componentWillMount() {
    this.props.fetchSpots();
  }

  // Runs when component receives new props that update the state
  componentWillReceiveProps(newState) {
    this.setState({ spots: newState.spots });
  }

  // Rendering component
  render() {
    const { spots } = this.props;

    return (
      <div className="spot-index-wrapper">
        <div className="spot-index-world-wrapper">
          <h2>Travel the world with Nookbnb</h2>
          <SpotWorldIndex spots={spots} /> 
        </div> 

        <div className="spot-index-top-wrapper">
          <h2>Top-rated places to stay</h2>
          <h3>Explore some of the best-reviewed stays in the world</h3>
          
          <ul>
            {spots.map(spot => <SpotIndexItem key={spot._id} spot={spot} />)}
          </ul>
        </div> 

        <Footer />
      </div>
    );
  }
}

export default withRouter(SpotIndex);