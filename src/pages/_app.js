import '../../styles/globals.css'
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <Auth
      env={process.env.NEXT_PUBLIC_ENV}
      config={{
        Auth: {
          userPoolId: process.env.NEXT_PUBLIC_AWS__COGNITO__USER_POOL_ID,
          userPoolWebClientId: process.env.NEXT_PUBLIC_AWS__COGNITO__USER_POOL_WEB_CLIENT_ID,
          region: process.env.NEXT_PUBLIC_AWS__COGNITO__REGION
        },
        ssr: true
      }}
    >
      <Component {...pageProps} />
    </Auth>
  )
}

export default MyApp;
