import React from "react";
import InputRange from "react-input-range";
import { parseTrackKey } from "../utils/index";

export const renderKeyBox = props => {
  const { handleKeyRadioChange } = props;
  const intKeyRange = Array.from({ length: 12 }, (x, i) => i); // range from 0-11 for keys

  const radioBoxes = intKeyRange.map(key => {
    return (
      <div key={key}>
        <input
          type="radio"
          name="key"
          id={`keyChoice${key}`}
          value={key}
          onChange={handleKeyRadioChange}
        />
        <label htmlFor="keyChoice1">{parseTrackKey(key)}</label>
      </div>
    );
  });

  return (
    <div className="tab-dropdown-container">
      <label className="tab-dropdown-heading">Key</label>
      <form className="radio">
        <div className="key-grid">{radioBoxes}</div>
      </form>
    </div>
  );
};

export const renderModeBox = props => {
  const { handleModalityRadioChange } = props;

  return (
    <div className="tab-dropdown-container">
      <label className="tab-dropdown-heading">Modality</label>
      <form className="radio">
        <div>
          <div>
            <input
              type="radio"
              name="modality"
              id="modeChoice1"
              value="0"
              onChange={handleModalityRadioChange}
            />
            <label htmlFor="modeChoice1">Minor</label>
          </div>
          <div>
            <input
              type="radio"
              name="modality"
              id="modeChoice2"
              value="1"
              onChange={handleModalityRadioChange}
            />
            <label htmlFor="modeChoice2">Major</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export const renderMinMaxBox = (
  ref,
  heading,
  minValue,
  maxValue,
  filterNameString,
  step,
  formatLabel
) => {
  const { handleApplyFilterMinMax } = ref.props;
  return (
    <div className="tab-dropdown-container">
      <label className="tab-dropdown-heading">{heading}</label>
      <div className="tab-input-container">
        <InputRange
          minValue={minValue}
          maxValue={maxValue}
          value={ref.state[filterNameString]}
          onChange={theValue => {
            ref.setState({ [filterNameString]: theValue });
          }}
          step={step}
          formatLabel={value => `${value}${formatLabel}`}
        />
      </div>
      <div className="tab-dropdown-button-container">
        <button
          className="button-add"
          onClick={() => {
            handleApplyFilterMinMax(
              filterNameString,
              ref.state[filterNameString].min,
              ref.state[filterNameString].max
            );
            ref.setState({
              appliedFilters: [
                ...ref.state.appliedFilters,
                filterNameString + ", "
              ]
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
