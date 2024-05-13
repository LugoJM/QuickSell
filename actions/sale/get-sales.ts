"use server";

import { Sale } from "@/types";

export const getSales = async () => {
    try {
        const requestURL = `${process.env.API_URL}/sales`;
        const requestOptions = {
            method: "GET",
          };
        const response : Sale[] = await fetch(requestURL, {...requestOptions}).then(res => res.json());
        
        return {
            ok : true,
            sales : response
        }
    } catch (error) {
        throw new Error("Error while fetching the sales.")
    }
};