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

  console.log(carrinho);

  function update() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header(carrinho)}
  <div class="container">
    ${produtos.map((produto: Produto) => Card(produto)).join("")}
  </div>
  `;

    document.querySelectorAll("input").forEach(input => {
      const [tipo, id] = input.id.split("-");

      if (tipo === "add") {
        input.onclick = async (_) => {
          await carinhoService.adicionarAoCarrinho(parseInt(id));
          carrinhoStore.saveCarrinho(carrinho);
          update();
        }
      } else {
        if (!carinhoService.procurarPorId(parseInt(id))) {
          input.style.display = "none";
        } else {
          input.style.display = "inline-block";
        }

        input.onclick = async (_) => {
          await carinhoService.removerDoCarrinho(parseInt(id));
          carrinhoStore.saveCarrinho(carrinho);
          update();
        }
      }
    });
  }

  update();
})();
