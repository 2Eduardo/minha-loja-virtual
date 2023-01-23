export interface Produto {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
};

export interface Carrinho {
  produtos: Map<number, number>,
  precoTotal: number,
  contadorProdutos: number,
};
