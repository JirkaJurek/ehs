<template>
  <tr>
    <td class="text-xs-center">{{ item.number }}</td>
    <td
      class="text-xs-center"
      v-if="type === 'directiveOs'"
    >{{ item.version }}</td>
    <td
      class="text-xs-center"
      v-if="type !== 'decisionRjs'"
    >
      <revision
        :lastRevisionIndex="item.lastRevisionIndex"
        :id="item.id"
      />
    </td>
    <td class="text-xs-center">{{ item.fileName }}</td>
    <td class="text-xs-center">{{ item.validFrom }}</td>
    <td class="text-xs-center">
      <user-full-name :id="item.processorId" />
    </td>
    <td class="text-xs-center">{{ item.processedDate | dateFormat }}</td>
    <td class="text-xs-center">
      <user-full-name :id="item.approverId" />
    </td>
    <td class="text-xs-center">{{ item.approvedDate | dateFormat }}</td>
    <td
      class="text-xs-center"
      v-html="getFileLink(item)"
    ></td>
    <td class="justify-center layout px-0">
      <edit :id="item.id" />
      <delete
        :type="type"
        :id="item.id"
      />
    </td>
  </tr>
</template>

<script>
import { DeleteButton, EditButton, RevisionButton } from "../components";
import UserFullName from "../../user/components/UserFullName";

export default {
  components: {
    edit: EditButton,
    delete: DeleteButton,
    revision: RevisionButton,
    "user-full-name": UserFullName
  },
  computed: {
    baseApiPath() {
      // return process.env.VUE_APP_SERVER_URL;
      // return location.origin;
      return `${location.protocol}//${location.hostname}:3031`;
    }
  },
  props: ["item", "type"],
  watch: {},
  methods: {
    getFileLink(item) {
      const file = this.toJson(item.file);
      return `<a href="${this.baseApiPath + file.path}" target="_blanc">${file.name}</a>`;
    }
  }
};
</script>