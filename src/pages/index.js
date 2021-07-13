import Head from 'next/head'
import styles from '../../styles/Home.module.css'


function Home({env}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hi I'm {env}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Web page in progress 🛠️👷
        </h1>

        <p className={styles.description}>
          (Meanwhile, Hi Mom I ❤️ you so much!)
        </p>
      </main>
    </div>
  )
}

export default Home;

export async function getStaticProps() {
  return {
    props: {env: process.env.NEXT_PUBLIC_ENV}
  }
}
