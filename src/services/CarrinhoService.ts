import { Carrinho } from "../models";
import { produtoService } from "./ProdutoService";

export const CarrinhoService = (carrinho: Carrinho) => {
  const adicionarAoCarrinho = async (produtoId: number) => {
    const produto = await produtoService.getProdutoById(produtoId);
    carrinho.precoTotal += produto!.price;

    if (carrinho.produtos.has(produtoId)) {
      carrinho.produtos.set(produtoId, carrinho.produtos.get(produtoId)! + 1);
    } else {
      carrinho.produtos.set(produtoId, 1);
    }

    carrinho.contadorProdutos++;
  }

  const removerDoCarrinho = async (produtoId: number) => {
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

  const procurarPorId = (produtoId: number) => {
    return carrinho.produtos.get(produtoId);
  }

  return { adicionarAoCarrinho, removerDoCarrinho, procurarPorId };
};
