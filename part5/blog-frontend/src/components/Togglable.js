import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef(({ label, handleCancel, children }, refs) => {
  const [visible, setVisible] = useState(false);
  const displayWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <button type="button" style={hideWhenVisible} onClick={() => toggleVisibility()}>{label}</button>
      <div style={displayWhenVisible}>
        {children}
        <button type="button" onClick={() => { handleCancel(); toggleVisibility(); }}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
