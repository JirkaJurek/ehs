import DialogUser from "./DialogUser.vue";
import DialogPermission from "./DialogPermission.vue";
import { map, prop } from "ramda";
export default {
  methods: {
    async editItem(id = 0) {
      let user = {};
      if (id) {
        const result = await this.axios.get(`/users/${id}`);
        user = result.data;
      }
      this.$store.commit(
        "setComponent",
        <DialogUser defaultItem={user} id={id} />
      );
    },
    async userPermission(userId) {
      const result = await this.axios.get(`/users/${userId}/permission`);
      const userPermission = result.data;

      this.$store.commit(
        "setComponent",
        <DialogPermission
          userPermission={map(prop("userPermissionId"), userPermission)}
          userId={userId}
        />
      );
    }
  }
};
