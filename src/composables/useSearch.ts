import { Ref, ref } from "@vue/composition-api";
import { Sale, SaleItem, isItem } from "@/models/index.model";
type Entity = SaleItem | Sale;
export type SearchResult = {
  searchQuery: string;
  results: {
    sales: Sale[];
    items: SaleItem[];
  };
};

export const useSearch = () => {
  const searchResults: Ref<SearchResult[]> = ref([]);
  const entityHasKeyWord = (entity: Entity, keywords: string[]): boolean => {
    const textToSearch = entity.title
      ? `${entity.title} ${entity.description}`
      : entity.description;

    return keywords.some(word => textToSearch.match(word));
  };

  const sorted = (entities: Entity[]): { items: SaleItem[]; sales: Sale[] } =>
    entities.reduce(
      (entitiesByType: { items: SaleItem[]; sales: Sale[] }, entity) => {
        if (isItem(entity)) {
          console.log(entity);
          entitiesByType.items.push(entity);
        } else {
          entitiesByType.sales.push(entity);
        }
        return entitiesByType;
      },
      { sales: [], items: [] }
    );
  const searchByKeyWords = (keyWords: string[], entities: Entity[]) => {
    const matchingEntities = entities.filter(entity =>
      entityHasKeyWord(entity, keyWords)
    );
    searchResults.value.unshift({
      searchQuery: keyWords.join(" "),
      results: sorted(matchingEntities)
    });
  };
  return { searchResults, searchByKeyWords };
};
