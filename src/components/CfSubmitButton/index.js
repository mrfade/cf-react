import { useDispatch } from "react-redux";
import { validateAndSubmit } from "../../stores/app";

export default function CfSubmitButton(props) {
  const disabled = props.disabled;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(validateAndSubmit());
  };

  return (
    <button
      disabled={disabled}
      className="cf-submit-button cf-input-button"
      onClick={() => handleSubmit()}
    >
      <div className="cf-input-icons">
        <div className="cf-icon-progress"></div>
        <div className="cf-icon-attachment"></div>
      </div>
    </button>
  );
}
