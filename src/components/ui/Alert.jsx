import Swal from "sweetalert2";

export const Alert = (icon = "success", title = "") => {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};
