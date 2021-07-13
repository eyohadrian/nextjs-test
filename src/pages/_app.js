import '../../styles/globals.css'
import Auth from "../components/Auth";
import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    userPoolId: process.env.AWS__COGNITO__USER_POOL_ID,
    userPoolWebClientId: process.env.AWS__COGNITO__USER_POOL_WEB_CLIENT_ID,
    region: process.env.AWS__COGNITO__REGION
  },
  ssr: true
});

function MyApp({ Component, pageProps }) {
  return (
    <Auth
      env={process.env.ENV}
    >
      <Component {...pageProps} />
    </Auth>
  )
}

export default MyApp;
