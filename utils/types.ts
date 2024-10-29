// notice that here we have the types for the return of the API calls
// you can use https://quicktype.io/ to convert JSON to typescript

export interface Cep {
  public: {
    country: {
      value: string;
    };
    postalCode: {
      value: string;
    };
    geoCoordinates?: {
      value: string;
    };
  };
}

export interface Session {
  id: string;
  namespaces: Namespaces;
}

export interface Namespaces {
  account: Account;
  store: Store;
  public: Public;
}

export interface Account {
  id: ID;
  accountName: AccountName;
}

export interface AccountName {
  value: string;
}

export interface ID {
  value: string;
  keepAlive: boolean;
}

export interface Public {}

export interface Store {
  channel: AccountName;
  countryCode: AccountName;
  cultureInfo: AccountName;
  currencyCode: AccountName;
  currencySymbol: AccountName;
  admin_cultureInfo: AccountName;
}

export interface Address {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  unidade: string;
  erro?: boolean;
}
