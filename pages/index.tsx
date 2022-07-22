import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import imageLoader from '../imageLoader';
import styles from '../styles/Home.module.css'
import { Character, GetCharacterResults } from '../types';
import Link from 'next/link';

const HomePage: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className={styles.container}>

      {characters.map((item) => {
        return <div key={item.id}>
          <Link href={`/characters/${item.id}`}>
            <a><h3>{item.name} </h3></a>
          </Link>
          <Image
            src={item.image}
            loader={imageLoader}
            unoptimized
            alt={item.name}
            width="200px"
            height="200px"
          />
        </div>
      })
      }
    </div>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character")
  const { results } = await res.json();



  return {
    props: {
      characters: results,
    },
  };
}

// export const getServerProps = async () => {

// }

export default HomePage
