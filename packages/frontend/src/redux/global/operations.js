import { setModalOpen } from './slice';

// Akcja do otwierania modala
export const openModal = (modalName) => (dispatch) => {
  dispatch(setModalOpen({ modalName, isOpen: true }));
};

// Akcja do zamykania modala
export const closeModal = (modalName) => (dispatch) => {
  dispatch(setModalOpen({ modalName, isOpen: false }));
};

