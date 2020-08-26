<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <h2 class="headline">{{ saleName }}</h2>
      </v-card-title>
      <v-card-text>
        <v-list-item v-if="!items.length">
          <v-list-item-content>
            <v-list-item-title class="text-wrap"
              >No items yet. Click below to add a new one</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>
            <v-list-item-title class="text-wrap">{{
              item.description
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isEditMode">
          <v-list-item-content>
            <v-textarea
              v-model="description"
              label="Description*"
              hint="example of helper text only on focus"
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>

      <v-card-actions class="px-8 pb-4">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2 action-btn action-btn-cancel"
          outlined
          color="primary"
          @click="handleCloseClick"
        >
          <v-icon class="mr-2">
            {{ isEditMode ? "mdi-cancel" : "mdi-close" }}</v-icon
          >
          {{ isEditMode ? "cancel" : "close" }}
        </v-btn>

        <v-btn
          color="primary"
          dense
          @click="handleConfirmClick"
          :disabled="isEditMode ? description.length < 5 : false"
          ><v-icon class="mr-2">
            {{ isEditMode ? "mdi-check-circle" : "mdi-plus-circle" }}</v-icon
          >
          {{ isEditMode ? "confirm" : "add new item" }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

const SaleItemsModal = defineComponent({
  name: "SaleItemsModal",
  props: ["dialog", "saleName", "items"],
  setup(_, { emit }) {
    const isEditMode = ref(false);
    const description = ref("");
    const handleCloseClick = () => {
      if (isEditMode.value) {
        isEditMode.value = !isEditMode.value;
      } else {
        emit("onClose", description.value);
      }
    };
    const handleConfirmClick = () => {
      if (isEditMode.value) {
        emit("onItemCreated", description.value);
        description.value = "";
      }
      isEditMode.value = !isEditMode.value;
    };
    return { isEditMode, description, handleConfirmClick, handleCloseClick };
  }
});

export default SaleItemsModal;
</script>

<style scoped></style>
