import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMeta = {
  title: 'School Express',
  site_name: 'School_express Website',
  description: 'School_express Website Description',
  url: process.env.NEXT_PUBLIC_WEB_URL || 'https://example.com', // Provide a default value for the URL
  image:
    'https://blackopal-images.s3.ap-south-1.amazonaws.com/property/images/justhomzjpg.jpg',
  type: 'website',
  robots: 'follow, index',
};

const Seo = (props) => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />

      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.site_name} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />
      {/* Remove unnecessary og:image meta tags */}
      <meta property='og:image:alt' content='JustHomz' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* <meta name="twitter:site" content="@th_clarence" /> */}
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {/* Remove unnecessary twitter:image:alt meta tag */}
      
      <link rel='shortcut icon' href='/images/icons/favicon-16x16.png' />
      {/* Provide the correct favicon.ico link */}
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
      {/* Add a favicon.ico link for fallback */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content={meta.image} />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

export default Seo;
