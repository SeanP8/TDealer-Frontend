import Page from '../components/Page';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../components/styles/nprogress.css';

import 'nprogress/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeErrot', () => NProgress.done());


// apollo comes from the withData func
function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
        <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
   
  )
}

// if any page has getInitialProps on it then run this function
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return {pageProps};
}

export default withData(MyApp)
