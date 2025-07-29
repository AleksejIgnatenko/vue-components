import { useToast } from "primevue/usetoast";

const toast = useToast();

export const showNotification = ({ severity, summary, detail, life = 3000 }) => {
    toast.add({ severity, summary, detail, life });
};