import { Helmet } from "react-helmet";

const SeoMetaTags = (props: {
  title: string;
  description: string;
  keywords: string;
}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
    </Helmet>
  );
};

SeoMetaTags.defaultProps = {
  title: "Bienvenue sur E-Shop - Home",
  description:
    "Nous vendons les meilleurs deals de toutes l'Afrique à des prix battant toutes concurrences.",
  keywords: "achats, electronics, moins chère, e-commerce",
};
export default SeoMetaTags;
