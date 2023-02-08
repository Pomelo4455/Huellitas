import React from 'react'

const Chat = () => {

    (function(d, w, c) {
        w.ChatraID = 'zcDzgC3NeKFwyWSTt';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'Chatra');

  return (
    <div></div>
  )
}

export default Chat