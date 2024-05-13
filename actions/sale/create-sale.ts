"use server";

import { RequestError, SaleRequest } from "@/types";
import { revalidatePath } from "next/cache";

export const createSale = async (sales : SaleRequest[]) => {
    try{
        const requestBody = { saleItems : sales};
        const requestURL = `${process.env.API_URL}/sales`;
        const requestOptions = {
            method: "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(requestBody)
          };
        const response = await fetch(requestURL, {...requestOptions });

        if(response.status !== 200)
        {
            const error = await response.json() as RequestError;
            const { message } = error;
            throw message;
        }
        
        revalidatePath("/sales");
        return {
            ok : true,
            message : "Venta creada satisfactoriamente."
        }
    }catch(error){
        return {
            ok : false,
            message : error as string
        }
    }
}