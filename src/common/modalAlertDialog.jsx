import React from "react";

const ModalAlertDialog = props => {
  const {
    title,
    body,
    handleConfirmClick,
    closeButtonLabel,
    confirmButtonLabel
  } = props;

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {closeButtonLabel}
            </button>
            <button
              type="button"
              className="btn btn-primary refresh"
              data-dismiss="modal"
              onClick={handleConfirmClick}
            >
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlertDialog;
