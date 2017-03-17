import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import strToId from '../utils/str-to-id';
import valuesChanged from '../utils/values-changed';

import * as propShapes from '../prop-shapes';

import PerceivedDemographicQuestion from './PerceivedDemographicQuestion';
import ProgressBar from './ProgressBar';
import ProportionalContainer from './ProportionalContainer';

import styles from './PerceivedDemographics.styl';

class PerceivedDemographics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  componentDidMount() {
    this.props.onEnter();
  }

  componentWillReceiveProps(nextProps) {
    // If the questions (or the image to which they apply) change, reset our state object
    if (valuesChanged(this.props, nextProps, ['questionOrder', 'image'])) {
      // TODO: This will break if a question with the name "currentStep" is passed in;
      // this state logic might be good to eventually migrate to the Redux store
      this.state = nextProps.questionOrder.reduce((nextState, question) => ({
        ...nextState,
        [question]: '',
      }), {
        currentStep: 0,
      });
    }
  }

  // Prepare the annotations into the format expected by the action/reducer
  prepareAnnotationsObject() {
    const annotations = this.props.questionOrder.map(questionName => ({
      name: questionName,
      value: this.state[questionName],
    }));
    return {
      id: this.props.image.id,
      annotations,
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    this.setState(({ currentStep }, { questionOrder }) => {
      const nextStep = currentStep + 1;
      const maxStep = questionOrder.length;
      return {
        // Persist value
        [name]: value,
        // Auto-advance to the next step, preventing out-of-bounds values
        currentStep: nextStep > maxStep ? maxStep : nextStep,
      };
    });
  }

  handleSubmit(event) {
    console.log('Submitted!');
    event.preventDefault();
    this.props.onSubmit(this.prepareAnnotationsObject());
    if (this.props.current > this.props.total) {
      this.props.onCompleteWorkload();
    }
  }

  prevStep() {
    // pull currentStep out of this.state to compute prev step
    this.setState(({ currentStep }) => {
      const prevStep = currentStep - 1;
      return {
        // Prevent out-of-bounds prevStep value
        currentStep: prevStep <= 0 ? 0 : prevStep,
      };
    });
  }

  render() {
    const { currentStep } = this.state;
    const {
      demographicAttributes,
      questionOrder,
      current: currentImage,
      total: totalImages,
    } = this.props;
    return (
      <div>
        <ProportionalContainer maxWidth="500px" widthHeightRatio={1}>
          <img
            src={this.props.image && this.props.image.url}
            alt="A face to label with perceived demographic information"
          />
        </ProportionalContainer>
        <ProgressBar
          className={styles.progressBar}
          incrementName="Image"
          current={currentImage}
          total={totalImages}
        />
        <ProgressBar
          className={styles.progressBar}
          incrementName="Step"
          current={currentStep + 1}
          total={questionOrder.length}
        />
        <form onSubmit={this.handleSubmit}>
          {questionOrder.map((questionName, idx) => {
            const { id, name, options } = demographicAttributes[questionName];
            return (
              <PerceivedDemographicQuestion
                key={`question_${strToId(name)}_${id}`}
                className={currentStep !== idx ? styles.hidden : ''}
                name={name}
                options={options}
                selected={this.state[name]}
                onChange={this.handleInputChange}
              />
            );
          })}
          {currentStep >= questionOrder.length ? (
            <div role="alert">
              <p>Review your annotations</p>
              <ul>{questionOrder.map((questionName) => {
                const { name } = demographicAttributes[questionName];
                const value = this.state[name];
                return (
                  <li key={`confirmation_${name}`}>
                    {name}: <strong>{value}</strong>
                  </li>
                );
              })}</ul>
            </div>
          ) : null}

          {currentStep !== 0 ? (
            <button
              className={styles.prev}
              type="button"
              onClick={this.prevStep}
            >Back</button>
          ) : null}

          <button
            className={classNames(styles.save, {
              [styles.hidden]: currentStep < questionOrder.length,
            })}
            type="submit"
          >Submit Annotations</button>
        </form>
      </div>
    );
  }
}

PerceivedDemographics.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCompleteWorkload: PropTypes.func.isRequired,
  demographicAttributes: PropTypes.objectOf(propShapes.demographicQuestion).isRequired,
  questionOrder: propShapes.demographicsQuestionList.isRequired,
  image: propShapes.workloadItem,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

PerceivedDemographics.defaultProps = {
  image: null,
};

export default PerceivedDemographics;
