import { useDispatch } from 'react-redux';
import { validateAndSubmit } from '../stores/app';

export default function CfSubmitButton () {

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('submit');

    dispatch(validateAndSubmit());
  }

  return (
    <div className='cf-submit-button cf-input-button' onClick={() => handleSubmit()}>
      <div className="cf-input-icons">
        <div className="cf-icon-progress"></div>
        <div className="cf-icon-attachment"></div>
      </div>
    </div>
  );
}