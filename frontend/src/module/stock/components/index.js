
import ExporterButtonComponent from "./ExporterButton.vue"
import ReceiverButtonComponent from "./ReceiverButton.vue"
import { auth } from "../../../auth";
export const ExporterButton = auth(ExporterButtonComponent);
export const ReceiverButton = auth(ReceiverButtonComponent);
