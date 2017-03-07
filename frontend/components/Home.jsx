import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>The Computer Vision Benchmarking Project</h1>
    <h5>From the Algorithmic Justice League</h5>
    <h2>Help us to measure bias in computer vision systems</h2>
    <p>
      The <acronym title="Algorithmic Justice League">AJL</acronym> is
      building the first annotated data set of diverse faces to benchmark
      bias in facial recognition systems.
    </p>
    <p>
      You can help by labeling images
      with <Link to="/PerceivedDemographics">perceived demographics</Link>,
      identifying specific <Link to="/Regions">regions</Link> and
      <Link to="/Landmarks">outlining features</Link> of the faces in our curated
      database of pictures of public domain faces.
    </p>
  </div>
);
