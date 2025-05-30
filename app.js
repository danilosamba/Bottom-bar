"use strict"; // Ativa o modo estrito para evitar erros comuns de programação

// Seleciona o elemento <body> da página
const body = document.body;

// Define um array com cores de fundo diferentes para o body
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];

// Seleciona o menu principal
const menu = body.querySelector(".menu");

// Seleciona todos os itens do menu
const menuItems = menu.querySelectorAll(".menu__item");

// Seleciona a borda decorativa do menu (indicador do item ativo)
const menuBorder = menu.querySelector(".menu__border");

// Seleciona o item que já estiver com a classe "active"
let activeItem = menu.querySelector(".active");

// Função executada quando um item do menu é clicado
function clickItem(item, index) {

    // Remove a propriedade CSS --timeOut (usada para animação, por exemplo)
    menu.style.removeProperty("--timeOut");
    
    // Se o item clicado já for o ativo, não faz nada
    if (activeItem == item) return;
    
    // Remove a classe "active" do item atualmente ativo (se houver)
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    // Adiciona a classe "active" ao item clicado
    item.classList.add("active");

    // Altera a cor de fundo do body com base no índice do item
    body.style.backgroundColor = bgColorsBody[index];

    // Atualiza a variável activeItem para o novo item
    activeItem = item;

    // Reposiciona a borda do menu sob o item ativo
    offsetMenuBorder(activeItem, menuBorder);
}

// Função que posiciona visualmente a borda sob o item ativo do menu
function offsetMenuBorder(element, menuBorder) {

    // Pega as dimensões e posição do item ativo
    const offsetActiveItem = element.getBoundingClientRect();

    // Calcula a posição horizontal para centralizar a borda sob o item
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - 
        (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";

    // Move a borda visualmente com transform
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

// Define a posição inicial da borda ao carregar a página
offsetMenuBorder(activeItem, menuBorder);

// Para cada item do menu, adiciona um evento de clique
menuItems.forEach((item, index) => {

    // Quando o item for clicado, chama a função clickItem
    item.addEventListener("click", () => clickItem(item, index));
})

// Quando a janela for redimensionada...
window.addEventListener("resize", () => {
    // Reposiciona a borda para se ajustar ao novo tamanho
    offsetMenuBorder(activeItem, menuBorder);

    // Define a propriedade --timeOut como "none" para evitar atrasos na animação
    menu.style.setProperty("--timeOut", "none");
});
