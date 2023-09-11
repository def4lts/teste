import { useQuery } from "react-query";
import { api } from "../api";

type Session = {
  id: string;
  description: string;
  authenticated: boolean;
  ready: boolean;
  qrcode: string;
};

async function getSession(): Promise<Session> {
  const { data } = await api.get(`/sessions/my-session`);

  return {
    id: data.id,
    description: data.description,
    authenticated: data.authenticated,
    ready: data.ready,
    qrcode: data.qrcode,
  };
}

export function useSession() {
  return useQuery(["session"], () => getSession(), {
    staleTime: 100, //10 minutos
  });
}

// Esse 3.o parâmetro staleTime é opcional.
// Se for informado, define o tempo que o react-query
// vai buscar novamente os dados. No caso, após 5 seg.
// Antes de 5 segundos, os dados são considerados "Fresh".
// Após 5 seg, são considerados stale (antigo), e faz refresh.
