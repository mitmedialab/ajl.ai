import React, { PropTypes } from 'react';
import Modal from './Modal';

const FAQModal = ({ onCloseFAQ }) => (
  <Modal
    onConfirm={onCloseFAQ}
    confirmText="Close"
  >
    <h4>What are we doing?</h4>
    <p>
      AJL needs your help to tag images with demographic information. Your
      tags will help us assess the diversity of data sets used to train and
      test facial analysis algorithms. We acknowledge that specific demographic
      categorizations are imprecise and reductive. We choose to gather
      perceptions of identity because the social constructs of ethnicity and
      gender have real-world impact.
    </p>
    <p>
      Our goal in gathering these tags is ultimately to create systems that
      work well for everybody and do not disproportionately harm a specific
      group. We welcome your feedback on additional labels to include or
      alternative ways to assess the diversity of these data sets.
    </p>
    <h4>How Can I Submit Feedback?</h4>
    <p>
      We welcome your feedback on the goals of this project, on the labels we
      are using, and on usability of this app. Please submit your feeback
      using <a href="https://goo.gl/forms/jBwH8fuMqZwLf6Mr2">our project&apos;s feedback from</a>.
    </p>
    <h4>What if there&apos;s no person in the image?</h4>
    <p>
      Our data set is based on images from IMDB, and have been autocropped.
      During the course of annotating you may come across images with an unclear
      subject, no subject at all, or innapropriate content. We ask you to
      &quot;flag&quot; these images using the flag button underneath each image to help
      us refine our data set. Thank you!
    </p>
  </Modal>
);

FAQModal.propTypes = {
  onCloseFAQ: PropTypes.func.isRequired,
};

export default FAQModal;
