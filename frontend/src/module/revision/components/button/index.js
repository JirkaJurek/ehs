import NewButtonComponent from "./NewButton.vue";
import NewRevisionButtonComponent from "./NewRevisionButton.vue";
import EditButtonComponent from "./EditButton.vue";
import DeleteButtonComponent from "./DeleteButton.vue";
import DetailButtonComponent from "./DetailButton.vue";

import { auth } from "../../../../auth";
export const NewButton = auth(NewButtonComponent);
export const NewRevisionButton = auth(NewRevisionButtonComponent);
export const EditButton = auth(EditButtonComponent);
export const DeleteButton = auth(DeleteButtonComponent);
export const DetailButton = auth(DetailButtonComponent);
