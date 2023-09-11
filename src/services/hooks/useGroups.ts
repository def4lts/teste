import { useQuery } from "react-query";
import { api } from "../api";

type Group = {
  id: string;
  name: string;
  desc: string;
  participants: object[];
  numberParticipants: number;
  inviteCode: string;
};

type GroupsResponse = {
  totalPages: number;
  totalCount: number;
  groups: Group[];
};

async function getGroups(page: number): Promise<GroupsResponse> {
  const { data } = await api.get(`/primary/my-groups/${page}`);

  const totalCount = Number(data.totalItems);
  const totalPages = Number(data.totalPages);

  const groups = data.items.map((group: Group) => {
    return {
      id: group.id,
      name: group.name,
      desc: group.desc,
      participants: group.participants,
      numberParticipants: group.numberParticipants,
      inviteCode: group.inviteCode,
    };
  });

  return {
    groups,
    totalCount,
    totalPages,
  };
}

export function useGroups(page: number) {
  return useQuery(["groups", page], () => getGroups(page), {
    staleTime: 1000,
  });
}
