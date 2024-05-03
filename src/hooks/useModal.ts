import { useCallback, useState } from "react";

export interface UseModalReturn {
  open: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

function useModal(): UseModalReturn {
  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, handleOpenModal, handleCloseModal };
}

export default useModal;
