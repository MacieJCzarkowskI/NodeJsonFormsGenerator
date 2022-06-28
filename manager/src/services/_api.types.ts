export interface User {
  token: string
  accessible_contracts: AccessibleContract[]
  roles: string[]
}

export interface AccessibleContract {
  contract: string
  contract_name: string
  groups: Group[]
}

export interface Group {
  group_name: string
  group_id: string
}
