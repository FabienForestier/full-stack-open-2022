import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef(({
  label, handleCancel, children, dataCy,
}, refs) => {
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
    <div data-cy={dataCy}>
      <button data-cy="toggle-display-button" type="button" style={hideWhenVisible} onClick={() => toggleVisibility()}>{label}</button>
      <div style={displayWhenVisible}>
        {children}
        <button type="button" onClick={() => { handleCancel(); toggleVisibility(); }}>Cancel</button>
      </div>
    </div>
  );
});
Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  label: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default Togglable;
