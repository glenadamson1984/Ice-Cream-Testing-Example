import { useState } from "react";

const SummaryForm = () => {
  const [enableButton, setEnableButton] = useState(false);

  const onCheckChange = () => {
    setEnableButton(!enableButton);
  };

  return (
    <div>
      <label htmlFor="enable-button-checkbox">Enable Button</label>
      <input
        id="enable-button-checkbox"
        type="checkbox"
        aria-checked={enableButton}
        checked={enableButton}
        onChange={onCheckChange}
      />
      <button disabled={!enableButton}>Submit Form</button>
    </div>
  );
};

export default SummaryForm;
