import { Produto } from "../models";

export const produtoService = {
  async readAll() {
    const produtos = await fetch("products.json").then(res => res.json());
    return produtos.products;
  },

  async getProdutoById(id: number) {
    const produto = await this.readAll().then((produtos) =>
      produtos.find((produto: Produto) => produto.id === id));
    return produto;
  }
};

