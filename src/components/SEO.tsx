import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEO = ({
  title = "Nordweb - Professionelle hjemmesider til danske virksomheder",
  description = "Få en professionel hjemmeside til din danske virksomhed. Fast pris fra 899 kr/md inkl. hosting, support og GDPR-sikkerhed. Ingen binding.",
  keywords = "hjemmeside, website, dansk webureau, professionel hjemmeside, webdesign Danmark",
  canonical,
  ogImage = "https://nordweb.dk/og-image.jpg",
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes("Nordweb") ? title : `${title} | Nordweb`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
