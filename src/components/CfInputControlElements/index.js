import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../../stores/input';

export default function CfInputControlElements () {

  const inputRef = useRef(null);
  const { value, disabled, required, placeholder } = useSelector(state => state.inputControl);
  const { currentQuestion } = useSelector(state => state.app);
  const dispatch = useDispatch();

  return (
    <div className="cf-input-control-elements hide-nav-buttons one-row resized animate-in">
    <div className="cf-list-button prev"></div>
    <div className="cf-list-button next"></div>
    <div
      className="cf-list"
      style={{
        height: '52px',
        width: '100%',
        transform: 'translateX(0px)',
      }}
    >
      <div className="cf-radio-button cf-button has-image animate-in" tabindex="2">
      <img className="cf-image loaded" src="https://space10-community.github.io/conversational-form/landingpage/photo1.jpg" />

        <div>
          <div className="cf-radio"></div>
          <span>Yes</span>
        </div>
      </div>
      <div className="cf-radio-button cf-button animate-in" tabindex="3">
        <div>
          <div className="cf-radio"></div>
          <span>No</span>
        </div>
      </div>
    </div>
  </div>
  )
}
