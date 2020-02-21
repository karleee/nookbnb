import React from "react";
import { openModal, closeModal } from "../../actions/modal_actions";
import '../../assets/stylesheets/spot_modal.css';

class SpotModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modal, spot } = this.props;
    let imageNum = modal.imageNum;

    return (
      <div className="spot-modal">
        <div className="selected-image-wrapper">
          <img src={spot.thumbnail_image_urls ? spot.thumbnail_image_urls[imageNum] : ''} alt="Spot photo" />
        </div> 

        <div className="close-wrapper" onClick={this.props.closeModal}>
          <img src='/images/spot_modal/modal_close.png' />
        </div>

        {/* <div className="side-images-wrapper">
          <div className="side-images">
            {spot.thumbnail_image_urls ? spot.thumbnail_image_urls.slice(imageNum + 1, spot.thumbnail_image_urls.length).map(url =>
              <div className="image">
                <img src={url} alt="Spot photo" />
              </div>) : ''}
          </div>

          <p>{imageNum + 1} / {spot.thumbnail_image_urls.length}</p>
        </div> */}
      </div>
    );
  }
}

export default SpotModal;