import classNames from 'classnames';

export default function ChatResponse({ owner, thumb, messages }) {
  return (
    <div className={classNames('cf-chat-response', 'show peak-thumb', 'thinking', {
      'user': owner === 'user',
      'robot': owner === 'robot',
    })}>
      <div className="thumb" style={{ backgroundImage: `url(${thumb})` }}><span></span></div>
      <div className="text">
        {messages && messages.map((message, index) => (
          <p key={`${index}-${message}`}  dangerouslySetInnerHTML={{ __html: message }} className='show thinking'></p>
        ))}
      </div>
    </div>
  );
}
