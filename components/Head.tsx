import { Helmet } from "react-helmet";

type HeadProps = {
  title?: string;
  description?: string;
};
export const Head = ({ title = "", description = "" }: HeadProps) => {
  return (
    <Helmet
      title={title ? `${title} | TikTik` : undefined}
      defaultTitle="Tiktik"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
