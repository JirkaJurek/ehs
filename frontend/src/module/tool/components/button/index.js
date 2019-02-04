import NewButtonComponent from "./NewButton.vue";
import EditButtonComponent from "./EditButton.vue";
import CloneButtonComponent from "./CloneButton.vue";
import BulkDeleteButtonComponent from "./BulkDeleteButton.vue";
import DeleteButtonComponent from "./DeleteButton.vue";

import { auth } from "../../../../auth";
export const NewButton = auth(NewButtonComponent);
export const EditButton = auth(EditButtonComponent);
export const CloneButton = auth(CloneButtonComponent);
export const DeleteButton = auth(DeleteButtonComponent);
export const BulkDeleteButton = auth(BulkDeleteButtonComponent);

