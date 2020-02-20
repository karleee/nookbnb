import React from "react";
import { withRouter } from "react-router-dom";
import { openModal, closeModal } from "../../actions/modal_actions";

class SpotModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="spot-photos-container">
        
      </div>
    );
  }
}

export default withRouter(SpotModal);