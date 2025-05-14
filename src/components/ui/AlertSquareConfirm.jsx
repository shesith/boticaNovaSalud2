import Swal from "sweetalert2";

export const AlertSquareConfirm = ({
  icon = "success",
  title = "",
  text = "",
  showDeny = false,
  denyButtonText = "Cancelar",
  confirmButtonText = "Aceptar",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showDenyButton: showDeny,
    confirmButtonText,
    denyButtonText,
    denyButtonColor: "#fb2c36",
    confirmButtonColor: "#51B4C3",
    allowOutsideClick: false,
    reverseButtons: false,
    scrollbarPadding: false,
  });
};
