import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Overlay from './Overlay';
import Loading from './Loading';
import Modal from './Modal';

import '../App.styl';

storiesOf('Overlays', module)
  .add('Basic Overlay Covers Page', () => (
    <div style={{ padding: '0 10px' }}>
      <p>Content should be occluded by the overlay</p>
      <Overlay>
        <div />
      </Overlay>
    </div>
  ))
  .add('Loading Spinner', () => (
    <Loading isLoading />
  ))
  .add('Modal', () => (
    <Modal
      onConfirm={action('confirmation-button-click')}
      confirmText="OK"
    >
      <h2>Some Title!</h2>
      <p>Paragraph content of some sort or another</p>
    </Modal>
  ))
  .add('Modal w/ Cancel Button', () => (
    <Modal
      onConfirm={action('confirmation-button-click')}
      confirmText="That's Fine"
      onCancel={action('cancel-button-click')}
      cancelText="No Way!"
    >
      <h2>Some Title!</h2>
      <p>Paragraph content of some sort or another</p>
    </Modal>
  ))
  .add('Modal w/ Tall Content', () => (
    <Modal
      onConfirm={action('confirmation-button-click')}
      confirmText="OK"
    >
      <h2>Some Title!</h2>
      <p>Paragraph content of some sort or another</p>
      <p>Paragraph content of some sort or another</p>
      <p>Paragraph content of some sort or another</p>
      <img width="300" height="900" src="http://placebear.com/300/900" alt="A Bear" />
      <p>Paragraph content of some sort or another</p>
      <p>Paragraph content of some sort or another</p>
      <p>Paragraph content of some sort or another</p>
    </Modal>
  ));
