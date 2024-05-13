"use server";

import { Product, RequestError } from "@/types";
import { revalidatePath } from "next/cache";

export const createProduct = async (product : Partial<Product>) => {
    try{
        const requestURL = `${process.env.API_URL}/products`;
        const requestOptions = {
            method: "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(product)
          };
        const response = await fetch(requestURL, {...requestOptions });

        if(response.status !== 200)
        {
            const error = await response.json() as RequestError;
            const { message } = error;
            throw message;
        }
        
        revalidatePath("/inventory");
        return {
            ok : true,
            message : "Producto creado satisfactoriamente."
        }
    }catch(error){
        return {
            ok : false,
            message : error as string
        }
    }
};