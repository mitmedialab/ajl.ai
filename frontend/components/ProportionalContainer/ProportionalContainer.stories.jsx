import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProportionalContainer from './';
import '../App.styl';

const colorFillStyle = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  background: 'magenta',
  padding: '1em',
};

storiesOf('ProportionalContainer', module)
  .add('1:1 (Square) 300px max width', () => (
    <ProportionalContainer widthHeightRatio={1} maxWidth="300px">
      <div style={colorFillStyle}>
        Content inside this component will be constrained to a square container
      </div>
    </ProportionalContainer>
  ))
  .add('4:3 400px max width', () => (
    <ProportionalContainer widthHeightRatio={4 / 3} maxWidth="400px">
      <div style={colorFillStyle}>
        Content inside this component will be constrained to a 4:3 container
      </div>
    </ProportionalContainer>
  ))
  .add('16:9 600px max width', () => (
    <ProportionalContainer widthHeightRatio={16 / 9} maxWidth="600px">
      <div style={colorFillStyle}>
        Content inside this component will be constrained to a 16:9 container
      </div>
    </ProportionalContainer>
  ));
