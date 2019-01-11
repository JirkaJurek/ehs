export { default as NewFulfillmentButton } from "./NewFulfillmentButton.vue";
export { default as DeleteButton } from "./DeleteButton.vue";
export { default as DoneButton } from "./DoneButton.vue";
export { default as EditButton } from "./EditButton.vue";
// export { default as Auth } from "../../../auth";
import NewButtonComponent from "./NewButton.vue"
import { auth } from "../../../auth";
export const NewButton = auth(NewButtonComponent);
