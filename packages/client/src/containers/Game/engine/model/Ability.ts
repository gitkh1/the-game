type T_Props = {
  id: string;
  name: string;
  icon: string;
  cost: number;
};

export class Ability {
  id: string;
  name: string;
  icon: string;
  cost: number;
  count = 0;
  buyAmount = 0;

  constructor({ id, name, icon, cost }: T_Props) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.cost = cost;
  }

  addCount(count: number) {
    this.count += count;
    // save(this.id, this.count);
  }
  // apply(model: T_GameModel): boolean;
}
