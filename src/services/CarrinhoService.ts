import { Carrinho } from "../models";
import { produtoService } from "./ProdutoService";

export const carrinho: Carrinho = {
  produtos: new Map(),
  precoTotal: 0,
  contadorProdutos: 0,
};

export const carrinhoService = {
  async adicionarAoCarrinho(produtoId: number) {
    const produto = await produtoService.getProdutoById(produtoId);
    carrinho.precoTotal += produto!.price;
    
    if (carrinho.produtos.has(produtoId)) {
      carrinho.produtos.set(produtoId, carrinho.produtos.get(produtoId)! + 1);
    } else {
      carrinho.produtos.set(produtoId, 1);
    }
    
    carrinho.contadorProdutos++;
  },
  
  async removerDoCarrinho(produtoId: number) {
    const produto = await produtoService.getProdutoById(produtoId);

    if (carrinho.produtos.has(produtoId)) {
      const contador = carrinho.produtos.get(produtoId);

      if (contador === 1) {
        carrinho.produtos.delete(produtoId);
      } else {
        carrinho.produtos.set(produtoId, contador! - 1);
      }

      carrinho.precoTotal -= produto!.price;
      carrinho.contadorProdutos--;
    }
  }
};
