import React from "react";

function Alert() {
  return (
    <div>
      <div
        className='alert alert-info alert-dismissible fade show'
        role='alert'
      >
        <strong>Note Deleted!</strong> You should check in on some of those
        fields below.
        <button
          type='button'
          className='btn-close'
          data-bs-dismiss='alert'
          aria-label='Close'
        ></button>
      </div>
    </div>
  );
}

export default Alert;
