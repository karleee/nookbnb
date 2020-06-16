import React from "react";
import '../../assets/stylesheets/modal/spot_modal.css';

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
      <div className="spot modal-wrapper">
        <div className="spot modal-main-image-wrapper"> 
          <img src='/images/spot_detail/previous_arrow_icon.png' alt='Previous arrow' className='spot prev-arrow' onClick={this.previous} />

          <div className="modal selected-image-wrapper">
            <img src={spot.thumbnail_image_urls ? spot.thumbnail_image_urls[this.state.currentImage] : ''} alt="Spot photo" />
          </div> 

          <img src='/images/spot_detail/next_arrow_icon.png' alt='Next arrow' className='spot next-arrow' onClick={this.next} />
        </div>

        <div className="spot side-images-wrapper">
          <div className="spot close-wrapper" onClick={this.props.closeModal}>
            <img src='/images/spot_modal/modal_close.png' />
          </div>

          <div className="spot thumbnails-wrapper">
            {spot.thumbnail_image_urls ? spot.thumbnail_image_urls.map((url, indx) =>
              <div className={`spot image-wrapper ${indx === this.state.currentImage ? "active" : ""}`} onClick={() => this.handleClick(indx)}>
                <img src={url} alt="Spot photo" />
              </div>) : ''}
          </div>

          <div className="spot numbering-wrapper">
            <p>{this.state.currentImage + 1} / {spot.thumbnail_image_urls.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotModal;