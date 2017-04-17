import React, { PropTypes } from 'react';
import Modal from './Modal';

const FAQModal = ({ onCloseFAQ }) => (
  <Modal
    onConfirm={onCloseFAQ}
    confirmText="Close"
  >
    <h4>What are we doing?</h4>
    <p>
      We are annotating IMDB-Wiki, the largest publicly available face-data set
      for researchers, in order to increase data transparency.
    </p>
    <h4>Why are we doing this?</h4>
    <p>
      Algorithms used to recognize faces are trained and tested with data sets.
      A lack of diversity in these data sets can lead to biased systems. We
      currently have no idea how representative our computer vision research
      data sets are. We&apos;re annotating this data set in order to asses
      demographic representation, develop a new evaluation metric, and create
      insights for better systems.
    </p>
    <h4>How did you choose your demographic labels?</h4>
    <p>
      The demographic labels we selected are reflective of existing conventions
      in western classification systems. We acknowledge that specific
      demographic categorizations are imprecise and reductive. We choose to
      gather perceptions of identity because the social constructs of ethnicity
      and gender have real-world impact. Our goal in gathering these tags is
      ultimately to create systems that work well for everybody and do not
      disproportionately harm a specific group. We welcome your feedback on
      additional labels to include or alternative ways to assess the diversity
      of these data sets.
    </p>
    <h4>What if there&apos;s no person in the image?</h4>
    <p>
      Our data set is based on images from IMDB, and have been auto-cropped.
      During the course of annotating you may come across images with an
      unclear subject, no subject at all, or inappropriate content. We ask you
      to &lquo;flag&rquo; these images using the flag button underneath each
      image to help us refine our data set. Thank you!
    </p>
    <h4>How long will this take me?</h4>
    <p>
      Annotating each image should take 30 or less seconds on each image.
      Your first batch should take less than 5 minutes.
    </p>
    <h4>Why do I have to submit 12 images in order to get started?</h4>
    <p>
      We require 12 annotations to start using the system to get a sense of how
      you annotate. Once you submit 12, you&apos;ll be able to do smaller
      batches of 3 at a time.
    </p>
    <h4>How Can I Submit Feedback?</h4>
    <p>
      We welcome your feedback on the goals of this project, on the labels we
      are using, and on usability of this app. Please submit your feedback
      using our project&apos;s feedback from.
    </p>
  </Modal>
);

FAQModal.propTypes = {
  onCloseFAQ: PropTypes.func.isRequired,
};

export default FAQModal;
