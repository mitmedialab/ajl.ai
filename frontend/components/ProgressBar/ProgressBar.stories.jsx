import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProgressBar from './';

storiesOf('ProgressBar', module)
  .add('0%', () => (
    <ProgressBar current={1} total={4} incrementName="Step" />
  ))
  .add('25%', () => (
    <ProgressBar current={2} total={4} incrementName="Step" />
  ))
  // .add('no border', () => (
  //   <ProgressBar current={1} total={4} border={false} incrementName="Step" />
  // ))
  .add('100%', () => (
    <ProgressBar current={5} total={4} incrementName="Step" />
  ));
