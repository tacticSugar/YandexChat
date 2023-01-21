import Block from '../../utils/Block';
import template from './search.pug';

interface SearchProps {
  value?: string,
  events: {
    change: () => void,
  }
}

export class Search extends Block<SearchProps> {
  constructor(props: SearchProps) {
    super('input', props);
    this.element?.classList.add('search_input');
    this.element?.setAttribute('type', 'search');
    this.element?.setAttribute('placeholder', 'Поиск');
    (this.element as HTMLInputElement).value = props.value ?? '';
  }

  getData() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
