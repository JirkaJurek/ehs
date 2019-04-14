import EditButtonComponent from "./EditButton.vue";
import NewButtonComponent from "./NewButton.vue";
import DeleteButtonComponent from "./DeleteButton.vue";

import { auth } from "../../../../auth";
export const EditButton = auth(EditButtonComponent);
export const NewButton = auth(NewButtonComponent);
export const DeleteButton = auth(DeleteButtonComponent);
export { default as RevisionButton } from "./RevisionButton";
export { default as NewRevisionButton } from "./NewRevisionButton";
