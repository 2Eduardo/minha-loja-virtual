import { Carrinho } from "../models";

export const carrinhoStore = {
  getCarrinho() {
    const produtosJson = localStorage.getItem("carrinho");

    if (!produtosJson) {
      return null;
    }

    const carrinhoJson = JSON.parse(produtosJson);
    const carrinho: Carrinho = {
      produtos: new Map(JSON.parse(carrinhoJson.produtos)),
      contadorProdutos: carrinhoJson.contadorProdutos,
      precoTotal: carrinhoJson.precoTotal,
    };
    
    return carrinho;
  },

  saveCarrinho(carrinho: Carrinho) {
    const produtosSerializados =
      JSON.stringify(Array.from(carrinho.produtos.entries()));

    localStorage.setItem("carrinho", JSON.stringify({
      produtos: produtosSerializados,
      contadorProdutos: carrinho.contadorProdutos,
      precoTotal: carrinho.precoTotal
    }));
  },
}