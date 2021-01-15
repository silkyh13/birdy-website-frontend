import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const RequestSentModal = ({ show, setShow, modalMessage }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestSentModal;
