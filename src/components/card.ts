import { Produto } from "../models"

export const Card = (produto: Produto) => {
  return `
    <div class="card">
      <h1 class="title">${produto.title}</h1>
      <img src="${produto.thumbnail}" alt="${produto.title} thumbnail" />
      <h2>R$ ${produto.price}</h2>
      <div class="card-input">
        <input id="add-${produto.id}" type="button" value="Adicionar ao carrinho" />
        <input id="rm-${produto.id}" type="button" value="-" />
      </div>
    </div>
  `;
};
