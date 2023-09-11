import { useQuery } from "react-query";
import { api } from "../api";

type Client = {
  id: string;
  name: string;
  number: string;
  created_at: string;
};

type UsersResponse = {
  totalCount: number;
  clients: Client[];
};

async function getClients(page: number): Promise<UsersResponse> {
  //const response = await fetch('http://localhost:3000/api/users')
  //const data = await response.json()
  const { data } = await api.get(`/clients/${page}`);

  const totalCount = Number(data.total);

  const clients = data.clients.map((client: Client) => {
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

  return {
    clients,
    totalCount,
  };
}

export function useClients(page: number) {
  //return useQuery('clients', () => getclients(page), {
  return useQuery(["client", page], () => getClients(page), {
    staleTime: 1000, //10 minutos
  });
}

// Esse 3.o parâmetro staleTime é opcional.
// Se for informado, define o tempo que o react-query
// vai buscar novamente os dados. No caso, após 5 seg.
// Antes de 5 segundos, os dados são considerados "Fresh".
// Após 5 seg, são considerados stale (antigo), e faz refresh.
