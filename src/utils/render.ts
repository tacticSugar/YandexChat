import Block from './Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  const element = block.getContent();
  if (root && element) {
    root.innerHTML = '';
    root.appendChild(element);
  }
  return root;
}
