import { Card } from './components/card';
import { Header } from './components/header';
import { produtoService } from './services/ProdutoService';
import { carrinhoStore } from './storage/CarrinhoStorage';
import { Produto } from './models';
import { CarrinhoService } from './services/CarrinhoService';
import './style.css'

(async () => {
  const produtos: Produto[] = await produtoService.readAll();
  const carrinho = carrinhoStore.getCarrinho() ?? {
    produtos: new Map(),
    precoTotal: 0,
    contadorProdutos: 0,
  };
  const carinhoService = CarrinhoService(carrinho);

  function update() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header(carrinho)}
  <div class="produtos-container">
    ${produtos.map((produto: Produto) => Card(produto)).join("")}
  </div>
  `;

    document.querySelectorAll("input").forEach(input => {
      const [tipo, id] = input.id.split("-");
      const productAlreadyInCar = carinhoService.hasProductId(parseInt(id));

      if (tipo === "add") {
        if (productAlreadyInCar) {
          input.value = "+";
        }

        input.onclick = async (_) => {
          await carinhoService.adicionarAoCarrinho(parseInt(id));
          carrinhoStore.saveCarrinho(carrinho);
          update();
        }
      } else {
        if (!productAlreadyInCar) {
          input.style.display = "none";
        } else {
          input.style.display = "block";
        }

        input.onclick = async (_) => {
          await carinhoService.removerDoCarrinho(parseInt(id));
          carrinhoStore.saveCarrinho(carrinho);
          update();
        }
      }
    });

    const carrinhoDiv = document.querySelector(".carrinho");
    carrinhoDiv?.addEventListener("click", () => {

      carrinho.produtos.forEach(async (qtde, produtoId) => {
        const produto = await produtoService.getProdutoById(produtoId);
        alert(`
          Produto: ${produto.title} \n 
          Preço: ${produto.price} \n 
          Quantidade: ${qtde} \n 
          Total: ${produto.price * qtde}
        `);
      })
    });
  }

  update();
})();
