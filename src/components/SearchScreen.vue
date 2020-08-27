<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card fluid class="fill-height rounded-0">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('onClose')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Search for Sales or Items</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="searchQuery"
                label="Search terms"
                placeholder="Petit cache pot en porcelaine..."
                prepend-icon="mdi-magnify"
                @click:prepend="handleClickSearch"
                outlined
                filled
                rounded
                dense
              ></v-text-field>

              <v-list-item-subtitle
                >Search by items or sales</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-container fluid class="grey lighten-3 fill-height">
          <v-row class="fill-height" no-gutters>
            <v-col lass="col-12 col-sm-4">
              <v-card class="ma-2 rounded-0" flat>
                <v-card-text>
                  <div>Word of the Day</div>
                  <p class="display-1 text--primary">
                    Search History
                  </p>
                  <p>Searched terms :</p>
                  <div class="text--primary flex-column">
                    <v-chip
                      class="ma-2"
                      :color="
                        index === activeSearchIndex
                          ? 'primary'
                          : 'grey--lighten-2'
                      "
                      v-for="(search, index) in searchResults"
                      :key="index"
                      @click="activeSearchIndex = index"
                    >
                      <v-avatar
                        left
                        :class="
                          index === activeSearchIndex
                            ? 'blue darken-4'
                            : 'grey darken-2 white--text'
                        "
                      >
                        {{ totalResultsCount(search) }}
                      </v-avatar>
                      "{{ search.searchQuery }}"
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card></v-col
            >

            <v-col class="col-12 col-sm-8 order-2" v-if="activeSearch">
              <v-card class="ma-2 rounded-0" flat>
                <v-expansion-panels
                  flat
                  hover
                  multiple
                  tile
                  accordion
                  :value="[0, 1]"
                >
                  <v-expansion-panel
                    v-for="item in ['sales', 'items']"
                    :key="item"
                  >
                    <v-expansion-panel-header
                      ><h3 class="font-weight-bold grey--text text--darken-2">
                        <v-icon class="mr-2">{{
                          item === "sales" ? "mdi-gavel" : "mdi-lamps"
                        }}</v-icon>
                        {{ item }}
                      </h3></v-expansion-panel-header
                    >

                    <v-expansion-panel-content
                      v-for="(itemResult, i) in activeSearch.results[item]"
                      :key="`result-${i}`"
                    >
                      <p class="grey--text text--darken-2">
                        {{ itemResult.description }}
                        <span
                          v-if="isItem(itemResult)"
                          class="font-weight-thin primary--text text--lighten-1"
                        >
                          - in {{ saleName(itemResult) }}
                        </span>
                      </p>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import { SearchResult, useSearch } from "@/composables/useSearch";
import { Sale, SaleItem, isItem } from "@/models/index.model";

const SearchScreen = defineComponent({
  name: "SearchScreen",
  props: ["dialog", "sales", "items"],
  setup(props) {
    const { searchResults, searchByKeyWords } = useSearch();
    const activeSearchIndex = ref(0);
    const searchQuery = ref("");
    const activeSearch = computed(
      () => searchResults.value[activeSearchIndex.value]
    );

    const saleName = (item: Sale | SaleItem) => {
      return isItem(item) ? findSale(item.sale_id).title : item.title;
    };

    const findSale = (saleId: string) =>
      props.sales.find((sale: Sale) => sale.id === saleId);

    const totalResultsCount = (search: SearchResult) =>
      search.results.items.length + search.results.sales.length;

    const handleClickSearch = () =>
      searchByKeyWords([searchQuery.value], [...props.items, ...props.sales]);

    watch(
      () => searchResults.value,
      () => (activeSearchIndex.value = 0)
    );

    return {
      searchQuery,
      searchResults,
      saleName,
      handleClickSearch,
      totalResultsCount,
      activeSearch,
      activeSearchIndex,
      isItem
    };
  }
});
export default SearchScreen;
</script>
