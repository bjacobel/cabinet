import React, { Component } from 'react';
import AriaModal from 'react-aria-modal';

import {
  phoneWrapper,
  phoneText,
  closeModal,
  modalContent,
  bigPhone,
  phoneLink,
  headerCloseHint,
  headerCloseBtn,
} from '../stylesheets/phone.css';

export default class Phone extends Component {
  componentWillMount() {
    this.state = { modalOpen: false };
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
  }

  activateModal() {
    this.setState({
      modalOpen: true,
    });
  }

  deactivateModal() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const { number, name } = this.props;

    if (!number || number === '') {
      return null;
    }

    return (
      <div>
        <button
          className={ phoneWrapper }
          aria-labelledby="phone-label"
          onClick={ this.activateModal }
        />
        <span id="phone-label" className={ phoneText }>View the phone number for { name }&#39;s office.</span>
        <AriaModal
          mounted={ this.state.modalOpen }
          titleText={ `Call ${name}'s office` }
          applicationNode={ document.getElementById('main') }
          onExit={ this.deactivateModal }
          focusDialog
        >
          <div className={ modalContent }>
            <header>
              <button
                className={ headerCloseBtn }
                aria-labelledby="header-close-hint"
                onClick={ this.deactivateModal }
              >
                ✖
              </button>
              <span id="header-close-hint" className={ headerCloseHint }>Close modal</span>
            </header>
            <h2>Call {name}&#39;s office.</h2>
            <p>
              <a href="https:/www.govtrack.us">GovTrack.us</a>
              <span> has the following phone number on record for this senator&#39;s office:</span>
            </p>
            <p className={ bigPhone }><a id="phone" className={ phoneLink } href={ `tel:${number}` }>{ number }</a></p>
            <p>
              <span>Click or dial the number above, and ask to speak to an aide or leave a message regarding </span>
              <span>your representative&#39;s position on past nominee votes. </span>
            </p>
            <p>
              <span>Then ask for your representative&#39;s support or opposition when votes on </span>
              <a href="https://www.washingtonpost.com/graphics/politics/trump-administration-appointee-tracker/">
                future nominees
              </a> are held.
            </p>
            <footer>
              <button className={ closeModal } onClick={ this.deactivateModal }>Close</button>
            </footer>
          </div>
        </AriaModal>
      </div>
    );
  }
}
