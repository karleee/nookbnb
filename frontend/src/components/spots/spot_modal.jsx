import React from "react";
import '../../assets/stylesheets/spot_modal.css';

class SpotModal extends React.Component {
  // Constructor for SpotModal
  constructor(props) {
    super(props);
    this.state = { currentImage: this.props.modal.imageNum };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  // Hides scrolling when modal is mounted
  componentDidMount() {
    if (this.props.modal) document.body.style.overflow = 'hidden';
  }

  // Reactiviates scrolling when modal is unmounted
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  // Handles image clicking
  handleClick(num) {
    this.setState({ currentImage: num });
  }

  // Goes to previous photo
  previous() {
    let newState = ((this.state.currentImage - 1) + this.props.spot.thumbnail_image_urls.length) % this.props.spot.thumbnail_image_urls.length;
    this.setState({ currentImage: newState });
  }

  // Goes to next photo
  next() {
    let newState = (this.state.currentImage + 1) % this.props.spot.thumbnail_image_urls.length;
    this.setState({ currentImage: newState });
  }

  // Renders component
  render() {
    const { spot } = this.props;

    return (
      <div className="spot-modal">
        <div className="modal-wrapper">
          <div className="modal main-image-wrapper">
            <div className="modal previous-arrow-wrapper" onClick={this.previous}> 
              <i className="previous-arrow"></i> 
            </div>

            <div className="modal selected-image-wrapper">
              <img src={spot.thumbnail_image_urls ? spot.thumbnail_image_urls[this.state.currentImage] : ''} alt="Spot photo" />
            </div> 

            <div className="modal next-arrow-wrapper" onClick={this.next}>
              <i className="next-arrow"></i>
            </div>
          </div>

          <div className="modal side-images-wrapper">
            <div className="close-wrapper" onClick={this.props.closeModal}>
              <img src='/images/spot_modal/modal_close.png' />
            </div>

            <div className="modal thumbnails-wrapper">
              {spot.thumbnail_image_urls ? spot.thumbnail_image_urls.map((url, indx) =>
                <div className={`modal thumbnail-image-wrapper ${indx === this.state.currentImage ? "active" : ""}`} onClick={() => this.handleClick(indx)}>
                  <img src={url} alt="Spot photo" />
                </div>) : ''}
            </div>

            <div className="numbering">
              <p>{this.state.currentImage + 1} / {spot.thumbnail_image_urls.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotModal;