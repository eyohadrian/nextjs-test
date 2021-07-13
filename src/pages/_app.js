import '../../styles/globals.css'
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <Auth env={process.env.ENV}>
      <Component {...pageProps} />
    </Auth>
  )
}

export default MyApp;
