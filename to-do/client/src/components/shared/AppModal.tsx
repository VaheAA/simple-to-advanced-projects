import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface AppModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export default function AppModal({ showModal, closeModal, children }: AppModalProps) {
  return (
    <>
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4">
            <div
              className="fixed inset-0 bg-black opacity-50  transition-all"
              onClick={closeModal}></div>

            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative">
              {children}

              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-all"
                onClick={closeModal}>
                <IoMdCloseCircleOutline className="h-7 w-7" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
