import { setModalOpen } from './slice';

export const openModal = (modalName) => (dispatch) => {
  dispatch(setModalOpen({ modalName, isOpen: true }));
};

export const closeModal = (modalName) => (dispatch) => {
  dispatch(setModalOpen({ modalName, isOpen: false }));
};

