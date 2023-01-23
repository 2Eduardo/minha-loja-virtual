import { Carrinho } from "../models";

export const Header = (carrinho: Carrinho) => {
  return `
    <header>
      <div class="logo">
        <img src="./minha-loja-logo.png" alt="logo da loja"/>
        <p>Minha Lojinha</p>
        </div>
      <div class="carrinho">
        <img src="./carrinho-logo.png" alt="logo do carrinho de compras"/>
        <p class="contador-carrinho">${carrinho.contadorProdutos}<p>
      </div>
    </header>
  `;
};
