"use server";

import { Sale, SaleItem } from "@/types";

export const getSaleById = async (saleId : string) => {
    try {
        const requestURL = `${process.env.API_URL}/sales/${saleId}`;
        const requestOptions = {
            method: "GET",
          };
        const response : Sale & {saleItems : SaleItem[]} = await fetch(requestURL, {...requestOptions}).then(res => res.json());
        
        return {
            ok : true,
            sale : response
        }
    } catch (error) {
        throw new Error("Error while fetching the sales.")
    } 
};