import React from 'react';

class SleepingArrangementIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { num } = this.props;
    let bedSizes = ['king', 'queen']; 

    return (
      <li>
        <i className="bed-icon"><img src='/images/spot_detail/bed_icon.png' /></i>
        <h3>Bedroom {num}</h3>
        <p>1 {bedSizes[Math.floor(Math.random() * bedSizes.length)]} bed</p> 
      </li>
    );
  }
}

export default SleepingArrangementIndexItem;