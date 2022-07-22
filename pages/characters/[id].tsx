import Image from "next/image";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";

function CharacterPage({character}:{character:Character}) {
    return (
        <>
        <h1>{character.name}</h1>
        <Image src={character.image} alt="" width="200px" height="200px" loader={imageLoader} unoptimized />
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResults = await res.json();
    return{
        paths:results.map((item)=>{
             return {params:{id:String(item.id)}};
        }),
        fallback:false,
    }; 
}
export async function getStaticProps({params}: {params: {id: string}}) {

    // const {params} = context;
    console.log(params)
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);

    const character = await res.json();
  return{
      props:{
          character,
      },
  }
}

export default CharacterPage;