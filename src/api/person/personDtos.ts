import { HalLink } from "../halLink";

export interface PersonReadDto {
  id: number
  name: string
  balances: Map<string, number>
  _links: PersonReadDtoLinks
}

export const emptyPersonReadDto: PersonReadDto = {
  id: 0,
  name: "",
  balances: new Map<string, number>(),
  _links: {
    self: {
      href: ""
    },
    userAccount: {
      href: ""
    },
    friendships: {
      href: ""
    }
  }
}

interface PersonReadDtoLinks {
  self: HalLink,
  userAccount: HalLink,
  friendships: HalLink
}

export interface PersonCreateDto {
  name: string,
  currencyAbbreviation: string
}