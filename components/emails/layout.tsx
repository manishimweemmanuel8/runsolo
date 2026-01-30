import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import type { ReactNode } from 'react';

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>RunSolo</Text>
          </Section>

          <Hr style={divider} />

          {/* Content */}
          <Section style={content}>{children}</Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} RunSolo. All rights reserved.
            </Text>
            <Text style={footerSubtext}>
              You&apos;re receiving this email because you have an account with
              RunSolo.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  borderRadius: '8px',
  overflow: 'hidden' as const,
  maxWidth: '600px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const header = {
  padding: '32px 48px 24px',
};

const logo = {
  fontSize: '28px',
  fontWeight: '700' as const,
  color: '#0a0a0a',
  margin: '0',
  letterSpacing: '-0.5px',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '0',
};

const content = {
  padding: '32px 48px',
};

const footer = {
  padding: '24px 48px 32px',
  backgroundColor: '#fafafa',
};

const footerText = {
  fontSize: '13px',
  color: '#666666',
  margin: '0 0 8px',
  textAlign: 'center' as const,
};

const footerSubtext = {
  fontSize: '12px',
  color: '#999999',
  margin: '0',
  textAlign: 'center' as const,
};
