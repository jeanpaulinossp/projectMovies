import ReactModal from "react-modal";

interface ModalPortalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

function responsiveModal(
  valueWidth: number,
  valueReturnTrue: string | number,
  valueReturnFalse: string | number
) {
  if (window.innerWidth < valueWidth) {
    return valueReturnTrue;
  }
  return valueReturnFalse;
}

export default function ModalPortal({
  isOpen,
  onRequestClose,
  children,
}: ModalPortalProps) {
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            position: "absolute",
            top: "10%",
            left: responsiveModal(650, "4%", "24%"),
            right: responsiveModal(650, "4%", "24%"),
            bottom: "14%",
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "0",
            maxWidth: "100%",
          },
        }}
        ariaHideApp={false}
      >
        {children}
      </ReactModal>
    </>
  );
}
