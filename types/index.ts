import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  stock:       number;
}

export interface Sale {
  id:             string;
  subTotal:       number;
  tax:            number;
  total:          number;
  productsInSale: number;
}

export interface SaleItem {
  id:        string;
  quantity:  number;
  saleId:    string;
  sale:      null;
  productId: string;
  product:   Product;
}

export type RequestError = {
  errorCode : string;
  message : string;
}

export interface SaleRequest {
  quantity: number;
  productid: string;
};
