"use server";

import { Product } from "@/types";

export const getProducts = async () => {
    try {
        const requestURL = `${process.env.API_URL}/products`;
        const requestOptions = {
            method: "GET",
          };
        const response : Product[] = await fetch(requestURL, {...requestOptions}).then(res => res.json());
        
        return {
            ok : true,
            inventory : response
        }
    } catch (error) {
        throw new Error("Error while fetching the inventory.")
    }
};