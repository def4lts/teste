import { useQuery } from "react-query";
import { api } from "../api";

type Category = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

type CategoriesResponse = {
  categories: Category[];
};

async function getCategories(): Promise<CategoriesResponse> {
  const { data } = await api.get(`/products/category`);

  const categories = data.allCategories.map((category: Category) => {
    return {
      id: category.id,
      name: category.name,
      number: category.description,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    categories,
  };
}

export function useCategories() {
  return useQuery(["category"], () => getCategories(), {
    staleTime: 1000,
  });
}
