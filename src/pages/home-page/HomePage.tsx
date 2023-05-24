import React from "react";
import { sendGenericAPIRequest } from "../../services/apiRequests";

export const HomePage: React.FC = () => {
  const getPokemon = async () => {
    sendGenericAPIRequest("https://pokeapi.co/api/v2/pokemon/1").then((data) =>
      console.log(data)
    );
  };
  getPokemon();
  return <>aaa</>;
};
