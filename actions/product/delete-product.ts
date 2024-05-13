"use server";

import { RequestError } from "@/types";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productID : string) => {

    try {
        const requestURL = `${process.env.API_URL}/products/${productID}`;
        const headers = {
            method : "DELETE",
        }

        const response = await fetch(requestURL, {...headers});

        if(response.status !== 200)
        {
            var error = await response.json() as RequestError;
            var { message } = error;
            throw message;
        }

        revalidatePath("/inventory");

        return {
            ok : true,
            message : "Producto eliminado correctamente."
        }
    } catch (error) {
        return {
            ok : false,
            message : error as string
        }
    }
};
