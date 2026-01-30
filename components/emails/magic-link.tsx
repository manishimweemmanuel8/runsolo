import { Button, Heading, Text, Section } from '@react-email/components';
import { EmailLayout } from './layout';

interface MagicLinkEmailProps {
  url: string;
  email: string;
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <EmailLayout preview="Sign in to RunSolo - Your magic link is inside">
      <Heading style={heading}>Sign in to RunSolo</Heading>

      <Text style={paragraph}>
        Click the button below to securely sign in to your account. This magic
        link will expire in 10 minutes for your security.
      </Text>

      <Section style={buttonContainer}>
        <Button style={button} href={url}>
          Sign In to RunSolo
        </Button>
      </Section>

      <Text style={paragraph}>
        If the button doesn&apos;t work, you can copy and paste this link into
        your browser:
      </Text>

      <Text style={link}>{url}</Text>

      <Text style={secondary}>
        If you didn&apos;t request this email, you can safely ignore it. No
        action will be taken on your account.
      </Text>

      <Text style={signoff}>
        Signing in as <strong>{email}</strong>
      </Text>
    </EmailLayout>
  );
}

const heading = {
  fontSize: '24px',
  fontWeight: '600' as const,
  color: '#0a0a0a',
  marginBottom: '24px',
  marginTop: '0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  marginBottom: '24px',
  marginTop: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#0a0a0a',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const link = {
  fontSize: '14px',
  color: '#6366f1',
  wordBreak: 'break-all' as const,
  marginBottom: '24px',
  marginTop: '0',
};

const secondary = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '16px',
  marginTop: '0',
};

const signoff = {
  fontSize: '14px',
  color: '#374151',
  marginBottom: '0',
  marginTop: '0',
};
