<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <h2 class="headline">Create a Sale</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field label="Title*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                label="Description*"
                hint="example of helper text only on focus"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions class="px-8 pb-4">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2 action-btn action-btn-cancel"
          outlined
          color="primary"
          @click="$emit('onCancel')"
        >
          <v-icon class="mr-2">mdi-lamps</v-icon>
          Cancel
        </v-btn>

        <v-btn color="primary action-btn action-btn-cancel"
          ><v-icon class="mr-2">mdi-floppy</v-icon> Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const SaleItemsModal = defineComponent({
  name: "SaleItemsModal",
  props: ["dialog", "saleName", "items"]
});

export default SaleItemsModal;
</script>

<style scoped></style>
