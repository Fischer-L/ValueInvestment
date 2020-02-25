import React from 'react';

import icoLoading from '@/assets/ico_loading.svg';

export default function Loading() {
  return (
    <div className="appContent-loading" key="appContent-loading">
      <img src={icoLoading} width="52px" alt="Loading..." />
    </div>
  );
}
