import { AbilityBuilder } from "@casl/ability";
import store from "../store";
import axios from "../myAxios";

export const define = () => AbilityBuilder.define(can => {
  let currentUser = store.getters.getCurrentUser();

  if (currentUser && currentUser.permissions) {
    // kdokoliv přihlášený se muže dostat na úvodní stránku
    can("page", "Home");
    currentUser.permissions.map(item => {
      can(item.action, item.subject);
    });
  } else {
    if (localStorage.basicToken) {
      axios.post("/permissions").then(response => {
        if (!response.data.status) {
          localStorage.basicToken = "";
        } else {
          // kdokoliv přihlášený se muže dostat na úvodní stránku
          can("page", "Home");
          store.state.user.currentUser = response.data;
          let currentUser = store.getters.getCurrentUser();
          if (currentUser && currentUser.permissions) {
            currentUser.permissions.forEach(item => {
              can(item.action, item.subject);
            });
          }
        }
      });
    }
  }
  // can("page", "Tools");
});
// export const defineAbilitiesFor = user => {
//   return AbilityBuilder.define((can, cannot) => {
//     if (user) {
//       user.permissions.map(item => {
//         can(item.action, item.subject);
//       });
//     }
//   });
// };

// const us = {
//   permissions: [
//     { action: "create", subject: "Post" },
//     { action: "update", subject: "Post" }
//   ]
// };
//
// const z = defineAbilitiesFor(us);
// console.log("POST");
// console.log(z.can("create", "Post"));
