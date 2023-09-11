import { useQuery } from "react-query";
import { api } from "../api";

type Client = {
  id: string;
  name: string;
  number: string;
  created_at: string;
};

type Purchase = {
  id: string;
  product_id: string;
  price: string;
  created_at: string;
};

type AllResponse = {
  totalProducts: number;
  totalClients: number;
  totalPurchases: number;
  purchasesSlice: Purchase[];
  clientsSlice: Client[];
};

async function getAll(): Promise<AllResponse> {
  let responseProducts = await api.get(`/products/1`);
  let totalProducts = Number(responseProducts.data.total);

  let responseClients = await api.get(`/clients/1`);
  let totalClients = Number(responseClients.data.total);

  let responsePurchases = await api.get(`/purchases/1`);
  let totalPurchases = Number(responsePurchases.data.total);

  let clients = responseClients.data.clients.map((client: Client) => {
    return {
      id: client.id,
      name: client.name,
      number: client.number,
      created_at: new Date(client.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  let purchases = responsePurchases.data.purchases.map((purchase: Purchase) => {
    return {
      id: purchase.id,
      product_id: purchase.product_id,
      price: purchase.price,
      created_at: new Date(purchase.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  const clientsSlice = clients.slice(0, 5);
  const purchasesSlice = purchases.slice(0, 5);

  return {
    totalProducts,
    totalClients,
    totalPurchases,
    clientsSlice,
    purchasesSlice,
  };
}

export function useAll() {
  return useQuery("all", () => getAll(), {
    staleTime: 1000,
  });
}
