export interface SaleInput {
  id: string | number;
  title: string;
  description: string;
}

interface SaleItemInput extends SaleInput {
  saleId: string;
}

export class Sale {
  // todo better type
  private id: string;
  private title: string;
  private description: string;
  constructor(saleInput: SaleInput) {
    this.id = `${saleInput.id}`;
    this.title = saleInput.title;
    this.description = saleInput.description;
  }
}

export class SaleItem extends Sale {
  private saleId: string;
  constructor(obj: SaleItemInput) {
    super(obj);
    this.saleId = obj.saleId;
  }
}
