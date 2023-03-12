import { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

export function toastFormErrors(errors: FieldErrors) {
  for (const fieldname in errors) {
    const message = errors[fieldname as keyof typeof errors]?.message;
    if (typeof message === "string") toast.error(message);
  }
}
