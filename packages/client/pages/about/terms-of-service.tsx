import type { ReactElement } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { Layout } from '../../layouts';
import { Link } from '../../components/ui';
import { Document } from '../../components/about';
import type { NextPageWithLayout } from '../_app';

const pageStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '90vh',
  bgcolor: 'primary.main',
};

const TermsOfService: NextPageWithLayout = () => (
  <Box sx={pageStyles}>
    <Document title="TERMS OF SERVICE">
      <Typography component="h1" variant="h5">
        Welcome to jsminigames!
      </Typography>

      <Typography>
        {`These terms and conditions outline the rules and regulations for the use
        of jsminigames's Website, located at
        https://jsminigames.vercel.app`}
      </Typography>

      <Typography>
        By accessing this website we assume you accept these terms and
        conditions. Do not continue to use jsminigames if you do not agree to
        take all of the terms and conditions stated on this page.
      </Typography>

      <Typography>
        {`The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this website and compliant to
        the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the
        process of our assistance to the Client in the most appropriate manner
        for the express purpose of meeting the Client’s needs in respect of
        provision of the Company’s stated services, in accordance with and
        subject to, prevailing law of Netherlands. Any use of the above
        terminology or other words in the singular, plural, capitalization
        and/or he/she or they, are taken as interchangeable and therefore as
        referring to same.`}
      </Typography>

      <Typography component="h2" variant="h6">
        License
      </Typography>

      <Typography>
        Unless otherwise stated, jsminigames and/or its licensors own the
        intellectual property rights for all material on jsminigames. All
        intellectual property rights are reserved. You may access this from
        jsminigames for your own personal use subjected to restrictions set in
        these terms and conditions.
      </Typography>

      <Typography>You must not:</Typography>
      <List>
        <ListItem>- Republish material from jsminigames</ListItem>
        <ListItem>
          - Sell, rent or sub-license material from jsminigames
        </ListItem>
        <ListItem>
          - Reproduce, duplicate or copy material from jsminigames
        </ListItem>
        <ListItem>- Redistribute content from jsminigames</ListItem>
      </List>

      <Typography>This Agreement shall begin on the date hereof</Typography>

      <Typography>
        You hereby grant jsminigames a non-exclusive license to use, reproduce,
        edit and authorize others to use, reproduce and edit any of your
        Comments in any and all forms, formats or media.
      </Typography>

      <Typography component="h2" variant="h6">
        Hyperlinking to our Content
      </Typography>

      <Typography>
        The following organizations may link to our Website without prior
        written approval:
      </Typography>

      <List>
        <ListItem>- Government agencies;</ListItem>
        <ListItem>- Search engines;</ListItem>
        <ListItem>- News organizations;</ListItem>
        <ListItem>
          - Online directory distributors may link to our Website in the same
          manner as they hyperlink to the Websites of other listed businesses;
          and
        </ListItem>
        <ListItem>
          - System wide Accredited Businesses except soliciting non-profit
          organizations, charity shopping malls, and charity fundraising groups
          which may not hyperlink to our Web site.
        </ListItem>
      </List>

      <Typography>
        These organizations may link to our home page, to publications or to
        other Website information so long as the link: (a) is not in any way
        deceptive; (b) does not falsely imply sponsorship, endorsement or
        approval of the linking party and its products and/or services; and (c)
        fits within the context of the linking party’s site.
      </Typography>

      <Typography>
        We may consider and approve other link requests from the following types
        of organizations:
      </Typography>

      <List>
        <ListItem>
          - commonly-known consumer and/or business information sources;
        </ListItem>
        <ListItem>- dot.com community sites;</ListItem>
        <ListItem>
          - associations or other groups representing charities;
        </ListItem>
        <ListItem>- online directory distributors;</ListItem>
        <ListItem>- internet portals;</ListItem>
        <ListItem>- accounting, law and consulting firms; and</ListItem>
        <ListItem>- educational institutions and trade associations.</ListItem>
      </List>

      <Typography>
        We will approve link requests from these organizations if we decide
        that: (a) the link would not make us look unfavorably to ourselves or to
        our accredited businesses; (b) the organization does not have any
        negative records with us; (c) the benefit to us from the visibility of
        the hyperlink compensates the absence of jsminigames; and (d) the link
        is in the context of general resource information.
      </Typography>

      <Typography>
        These organizations may link to our home page so long as the link: (a)
        is not in any way deceptive; (b) does not falsely imply sponsorship,
        endorsement or approval of the linking party and its products or
        services; and (c) fits within the context of the linking party’s site.
      </Typography>

      <Typography>
        If you are one of the organizations listed in paragraph 2 above and are
        interested in linking to our website, you must inform us by sending an
        e-mail to jsminigames. Please include your name, your organization name,
        contact information as well as the URL of your site, a list of any URLs
        from which you intend to link to our Website, and a list of the URLs on
        our site to which you would like to link. Wait 2-3 weeks for a response.
      </Typography>

      <Typography>
        Approved organizations may hyperlink to our Website as follows:
      </Typography>

      <List>
        <ListItem>- By use of our corporate name; or</ListItem>
        <ListItem>
          - By use of the uniform resource locator being linked to; or
        </ListItem>
        <ListItem>
          - By use of any other description of our Website being linked to that
          makes sense within the context and format of content on the linking
          party’s site.
        </ListItem>
      </List>

      <Typography>
        {`No use of jsminigames's logo or other artwork will be allowed for
        linking absent a trademark license agreement.`}
      </Typography>

      <Typography component="h2" variant="h6">
        iFrames
      </Typography>

      <Typography>
        Without prior approval and written permission, you may not create frames
        around our Webpages that alter in any way the visual presentation or
        appearance of our Website.
      </Typography>

      <Typography component="h2" variant="h6">
        Content Liability
      </Typography>

      <Typography>
        We shall not be hold responsible for any content that appears on your
        Website. You agree to protect and defend us against all claims that is
        rising on your Website. No link(s) should appear on any Website that may
        be interpreted as libelous, obscene or criminal, or which infringes,
        otherwise violates, or advocates the infringement or other violation of,
        any third party rights.
      </Typography>

      <Typography component="h2" variant="h6">
        Your Privacy
      </Typography>

      <Link href="./privacy">
        <Typography>Please read Privacy Policy</Typography>
      </Link>

      <Typography component="h2" variant="h6">
        Reservation of Rights
      </Typography>

      <Typography>
        We reserve the right to request that you remove all links or any
        particular link to our Website. You approve to immediately remove all
        links to our Website upon request. We also reserve the right to amen
        these terms and conditions and it’s linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow
        these linking terms and conditions.
      </Typography>

      <Typography component="h2" variant="h6">
        Disclaimer
      </Typography>

      <Typography>
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
      </Typography>

      <List>
        <ListItem>
          - limit or exclude our or your liability for death or personal injury;
        </ListItem>
        <ListItem>
          - limit or exclude our or your liability for fraud or fraudulent
          misrepresentation;
        </ListItem>
        <ListItem>
          - limit any of our or your liabilities in any way that is not
          permitted under applicable law; or
        </ListItem>
        <ListItem>
          - exclude any of our or your liabilities that may not be excluded
          under applicable law.
        </ListItem>
      </List>

      <Typography>
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort and for breach of
        statutory duty.
      </Typography>

      <Typography>
        As long as the website and the information and services on the website
        are provided free of charge, we will not be liable for any loss or
        damage of any nature.
      </Typography>
    </Document>
  </Box>
);

TermsOfService.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TermsOfService;
