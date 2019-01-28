import NewButtonComponent from "./NewButton.vue";
import BulkDeleteButtonComponent from "./BulkDeleteButton.vue";

import { auth } from "../../../../auth";
export const NewButton = auth(NewButtonComponent);
export const BulkDeleteButton = auth(BulkDeleteButtonComponent);

