import React, { Component } from 'react';
import '../../assets/stylesheets/footer/footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dev1: false,
      dev2: false,
      dev3: false
    }
    this.monitorClick();
    this.showContactInfo = this.showContactInfo.bind(this);
    this.monitorClick = this.monitorClick.bind(this);
  }

  showContactInfo(e, devNum) {
    e.stopPropagation();
    const allKeys = Object.keys(this.state);
    const currentDev = `dev${devNum}`;
    const foundKey = allKeys.indexOf(currentDev);
    let currentDevBool;

    if (devNum === 1) {
      currentDevBool = this.state.dev1;
    } else if (devNum === 2) {
      currentDevBool = this.state.dev2;
    } else {
      currentDevBool = this.state.dev3;
    }

    const otherDevs = allKeys.slice(2, foundKey).concat(allKeys.slice(foundKey + 1, allKeys.length));

    this.setState({ [currentDev]: !currentDevBool });

    otherDevs.forEach(dev => {
      this.setState({ [dev]: false });
    });
  }

  monitorClick() {
    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'developer-name-wrapper') {
        const allKeys = Object.keys(this.state);
        allKeys.forEach(dev => {
          this.setState({ [dev]: false});
        });
      }
    });
  }

  render() {
    return (
      <div className="footer-container">
        <div className="footer-columns-wrapper">
          <div className="about-wrapper">
            <h3>About</h3>
            <ul>
              <li><a href="https://github.com/karleee/nookbnb">Github</a></li>
            </ul>
          </div>

          <div className="discover-wrapper">
            <h3>Discover</h3>
            <ul>
              <li><a href="https://themorsel.herokuapp.com/#/">Morsel</a></li>
              <li><a href="http://dootify.herokuapp.com/#/splash">Dotify</a></li>
              <li><a href="http://quarrel-pro.herokuapp.com/#/">Quarrel</a></li>
            </ul>
          </div>

          <div className="developers-wrapper">
            <h3>Developers</h3>
            <ul>
              <li>
                <div className="developer-name-wrapper" onClick={e => this.showContactInfo(e, 1)}>
                  <p>Karen Lee</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev1 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <a href="https://github.com/karleee"><li>Github</li></a>
                    <a href="https://www.linkedin.com/in/karleee/"><li>LinkedIn</li></a>
                    <a href="https://angel.co/u/karleee"><li>Angel List</li></a>
                    <a href="http://karleee.com/"><li>Portfolio</li></a>
                    <a href="mailto:karleee@protonmail.com"><li>Email</li></a>
                  </ul>
                </div> : ''}
              </li>

              <li>
                <div className="developer-name-wrapper" onClick={e => this.showContactInfo(e, 2)}>
                  <p>Kieran Scannell</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev2 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <a href="https://github.com/ktscannell"><li>Github</li></a>
                    <a href="https://www.linkedin.com/in/kierantscannell/"><li>LinkedIn</li></a>
                    <a href="https://angel.co/u/kieran-scannell"><li>Angel List</li></a>
                    <a href="https://www.kierantscannell.com/"><li>Portfolio</li></a>
                    <a href="mailto:kieran.t.scannell@gmail.com"><li>Email</li></a>
                  </ul>
                </div> : ''}
              </li>

              <li>
                <div className="developer-name-wrapper" onClick={e => this.showContactInfo(e, 3)}>
                  <p>Elizabeth Dang</p>
                  <div className="developers-triangle-wrapper"></div>
                </div>

                {this.state.dev3 ? <div className="developers-dropdown-wrapper">
                  <ul>
                    <a href="https://github.com/eqdang"><li>Github</li></a>
                    <a href="https://www.linkedin.com/mwlite/in/elizabethqdang"><li>LinkedIn</li></a>
                    <a href="https://angel.co/u/eqdang"><li>Angel List</li></a>
                    <a href=""><li>Portfolio</li></a>
                    <a href="mailto:Elizabethqdang@gmail.com"><li>Email</li></a>
                  </ul>
                </div> : ''}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright-wrapper">
          <small>&copy; 2020 Nookbnb, All rights reserved</small>
        </div>
      </div>
    );
  }
}

export default Footer;