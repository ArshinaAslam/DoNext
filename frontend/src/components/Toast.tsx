interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <div className="toast">
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;