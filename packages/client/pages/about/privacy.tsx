import type { ReactElement } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { Layout } from '../../layouts';
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

const Privacy: NextPageWithLayout = () => (
  <Box sx={pageStyles}>
    <Document title="PRIVACY POLICY">
      <Typography component="h1" variant="h5">
        Privacy Policy for jsminigames
      </Typography>

      <Typography>
        At jsminigames, accessible from https://jsminigames.vercel.app, one of
        our main priorities is the privacy of our visitors. This Privacy Policy
        document contains types of information that is collected and recorded by
        jsminigames and how we use it.
      </Typography>

      <Typography>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </Typography>

      <Typography>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in jsminigames. This policy is not applicable to
        any information collected offline or via channels other than this
        website
      </Typography>

      <Typography component="h2" variant="h6">
        Consent
      </Typography>

      <Typography>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </Typography>

      <Typography component="h2" variant="h6">
        Information we collect
      </Typography>

      <Typography>
        The personal information that you are asked to provide, and the reasons
        why you are asked to provide it, will be made clear to you at the point
        we ask you to provide your personal information.
      </Typography>
      <Typography>
        If you contact us directly, we may receive additional information about
        you such as your name, email address, phone number, the contents of the
        message and/or attachments you may send us, and any other information
        you may choose to provide.
      </Typography>
      <Typography>
        When you register for an Account, we may ask for your contact
        information, including items such as name, company name, address, email
        address, and telephone number.
      </Typography>

      <Typography component="h2" variant="h6">
        How we use your information
      </Typography>

      <Typography>
        We use the information we collect in various ways, including to:
      </Typography>

      <List>
        <ListItem>- Provide, operate, and maintain our website</ListItem>
        <ListItem>- Improve, personalize, and expand our website</ListItem>
        <ListItem>- Understand and analyze how you use our website</ListItem>
        <ListItem>
          - Develop new products, services, features, and functionality
        </ListItem>
        <ListItem>- Send you emails</ListItem>
        <ListItem>- Find and prevent fraud</ListItem>
      </List>

      <Typography component="h2" variant="h6">
        GDPR Data Protection Rights
      </Typography>

      <Typography>
        We would like to make sure you are fully aware of all of your data
        protection rights. Every user is entitled to the following:
      </Typography>

      <List>
        <ListItem>
          - The right to access – You have the right to request copies of your
          personal data. We may charge you a small fee for this service.
        </ListItem>
        <ListItem>
          - The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
        </ListItem>
        <ListItem>
          - The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </ListItem>
        <ListItem>
          - The right to restrict processing – You have the right to request
          that we restrict the processing of your personal data, under certain
          conditions.
        </ListItem>
        <ListItem>
          - The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        </ListItem>
        <ListItem>
          - The right to data portability – You have the right to request that
          we transfer the data that we have collected to another organization,
          or directly to you, under certain conditions.
        </ListItem>
      </List>

      <Typography>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </Typography>

      <Typography component="h2" variant="h6">
        {'Children&apos;s Information'}
      </Typography>

      <Typography>
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </Typography>

      <Typography>
        jsminigames does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </Typography>
    </Document>
  </Box>
);

Privacy.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Privacy;
