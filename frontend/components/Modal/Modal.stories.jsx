import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Modal from './';
import '../App.styl';

storiesOf('Modal', module)
  .add('Basic Overlay', () => (
    <Modal
      onConfirm={action('confirmation-button-click')}
      confirmText="OK"
    >
      <h2>Some Title!</h2>
      <p>Paragraph content of some sort or another</p>
    </Modal>
  ))
  .add('With Cancel Button', () => (
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
  .add('With Very Tall Content', () => (
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
