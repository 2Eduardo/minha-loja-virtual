import { carrinho, carrinhoService } from './services/CarrinhoService';
import { Card } from './components/card';
import { Header } from './components/header';
import { produtoService } from './services/ProdutoService';
import './style.css'

(async () => {
  const produtos: [] = await produtoService.readAll();

  function update() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header(carrinho)}
  <div class="container">
    ${produtos.map((produto: any) => Card(produto)).join("")}
  </div>
  `;

    document.querySelectorAll("input").forEach(input => {
      const [tipo, id] = input.id.split("-");
      if (tipo === "add") {
        input.onclick = async (_) => { 
          await carrinhoService.adicionarAoCarrinho(parseInt(id));
          update();
        }
      } else {
        input.onclick = async (_) => {
          await carrinhoService.removerDoCarrinho(parseInt(id));
          update();
        } 
      }
    });
  }

  update();
})();
