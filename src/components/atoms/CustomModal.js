import { Modal } from "antd";

const CustomModal = ({
  title = "Basic Modal",
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
