import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export interface SaleInput {
  id?: string | number;
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
    this.id = saleInput.id ? `${saleInput.id}` : uuidv4();
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
