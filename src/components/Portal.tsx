import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container] = useState(document.getElementById('portal')!);

  return ReactDOM.createPortal(children, container);
};
