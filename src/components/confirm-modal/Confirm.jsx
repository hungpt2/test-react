import PropTypes from 'prop-types';
import { Dialog, Button } from 'element-react';


export const ConfirmModal = (props) => {
  const {
    closeModal,
    acceptFn,
    rejectFn,
    showModal,
    title,
    content,
    acceptBtn,
    rejectBtn,
  } = props;

  return (
    <Dialog
      title={title}
      size="tiny"
      visible={showModal}
      onCancel={closeModal}
      lockScroll={false}
    >
      <Dialog.Body>
        <span>{ content }</span>
      </Dialog.Body>
      <Dialog.Footer className="dialog-footer">
        <Button onClick={rejectFn}>{ rejectBtn }</Button>
        <Button type="primary" onClick={acceptFn}>{ acceptBtn }</Button>
      </Dialog.Footer>
    </Dialog>
  );
};

ConfirmModal.propTypes = {
  closeModal: PropTypes.func,
  acceptFn: PropTypes.func,
  rejectFn: PropTypes.func,
  showModal: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  acceptBtn: PropTypes.string,
  rejectBtn: PropTypes.string,
};

export default ConfirmModal;
