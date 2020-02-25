import React from 'react';

import icoDuck from '@/assets/ico_duck.jpg';

export default function ErrorDuck(msg) {
  return (
    <div className="appContent-error" key="appContent-error">
      <h3>Quack~something wrong.</h3>
      <p>{msg}</p>
      <img src={icoDuck} width="32px" alt="Duck..." />
    </div>
  );
}
