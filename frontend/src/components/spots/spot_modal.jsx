import React from "react";
import '../../assets/stylesheets/spot_modal.css';

class SpotModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: this.props.modal.imageNum
    }
  }

  handleClick(num) {
    this.setState({ currentImage: num });
  }

  render() {
    const { spot } = this.props;

    return (
      <div className="spot-modal">
        <div className="selected-image-wrapper">
          <img src={spot.thumbnail_image_urls ? spot.thumbnail_image_urls[this.state.currentImage] : ''} alt="Spot photo" />
        </div> 

        <div className="side-images-wrapper">
          <div className="close-wrapper" onClick={this.props.closeModal}>
            <img src='/images/spot_modal/modal_close.png' />
          </div>

          <div className="thumbnails">
            {spot.thumbnail_image_urls ? spot.thumbnail_image_urls.map((url, indx) =>
              <div className={`thumbnail-wrapper ${indx === this.state.currentImage ? "active" : ""}`} onClick={() => this.handleClick(indx)}>
                <img src={url} alt="Spot photo" />
              </div>) : ''}
          </div>

          <div className="numbering">
            <p>{this.state.currentImage + 1} / {spot.thumbnail_image_urls.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotModal;