import { toast } from 'react-toastify';

const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    limit: 3,
    pauseOnFocusLoss: true,
    newestOnTop: true,
};

const toastSuccess = (message) => {
    toast.success(message, defaultOptions);
};

const toastError = (message) => {
    toast.error(message, defaultOptions);
};

const toastInfo = (message) => {
    toast.info(message, defaultOptions);
};

const toastWarning = (message) => {
    toast.warn(message, defaultOptions);
};

export { toastSuccess, toastError, toastInfo, toastWarning, defaultOptions };
