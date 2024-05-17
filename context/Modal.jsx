import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(windowName),
  });
}

function Window({ children, name }) {
  //Here we use createPortal to render the Modal inside the body, to avoid any possible CSS conflict with its parent, for example if it was set its overflow hidden.
  const { close, openName } = useContext(ModalContext);

  const ref = useOnClickOutside(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed w-full h-screen backdrop-blur-sm z-50 transition-all duration-500 bg-[#ffffff19] top-0 left-0">
      <div
        className="fixed top-1/2 left-1/2 -translate-y-1/2 p-12 shadow-lg rounded-lg bg-[#a47485] transition-all duration-500"
        ref={ref}
      >
        <button
          className="bg-none border-none p-[0.4rem] rounded-lg translate-x-[0.8rem] [transition:all_0.2s] absolute top-[1.2rem] right-[1.9rem] hover:bg-[#E7D4B7]"
          onClick={close}
        >
          <HiXMark className="w-[2.4rem] h-[2.4rem] text-[#d63637]" />
        </button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
