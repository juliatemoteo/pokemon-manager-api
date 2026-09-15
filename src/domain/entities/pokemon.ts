export interface PokemonProps {
    id: string;
    name: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
}

export class Pokemon{
    private props: PokemonProps;

    constructor(props: PokemonProps){
        if(props.hp <= 0){
            throw new Error('O hp deve ser maior que 0.');
        }

        if(props.attack <= 0){
            throw new Error('O ataque deve ser maior que 0.');
        }

        if(props.defense <= 0){
            throw new Error('A defesa deve ser maior que 0.');
        }

        this.props = props;
    }

    get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  get hp() {
    return this.props.hp;
  }

  get name() {
    return this.props.name;
  }

  get attack() {
    return this.props.attack;
  }

  get defense() {
    return this.props.defense;
  }
  
}