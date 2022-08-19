import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ChatResponse from '../ChatReponse';

export default function ChatList() {

  const { responses, robotThinking } = useSelector(state => state.chat);

  return (
    <div className="cf-chat">
      <div className="scrollable">
        <div className="scrollableInner">
          {responses.map(response => (
            <ChatResponse owner={response.owner} thumb={response.thumb} messages={response.messages ?? [response.text]} />
          ))}

          <div className={classNames('cf-chat-response robot peak-thumb thinking', {
            'show': robotThinking,
          })}>
            <div className="thumb" ><span></span></div>
            <div className="text">
              <p className='show'>
                <b className="thinking">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span> {/* buraya ugra */}
                </b>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
