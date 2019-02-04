export { default as NewFulfillmentButton } from "./NewFulfillmentButton.vue";
export { default as TypeSelect } from "./TypeSelect.vue";
export { default as StatusSelect } from "./StatusSelect.vue";

import DoneButtonComponent from "./DoneButton.vue"
import NewButtonComponent from "./NewButton.vue"
import EditButtonComponent from "./EditButton.vue"
import DeleteButtonComponent from "./DeleteButton.vue"
import { auth } from "../../../auth";
export const NewButton = auth(NewButtonComponent);
export const EditButton = auth(EditButtonComponent);
export const DeleteButton = auth(DeleteButtonComponent);
export const DoneButton = auth(DoneButtonComponent);
