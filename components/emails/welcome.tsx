import { Button, Heading, Text, Section } from '@react-email/components';
import { EmailLayout } from './layout';

interface WelcomeEmailProps {
  name: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ name, dashboardUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to RunSolo - Let's get you started">
      <Heading style={heading}>Welcome to RunSolo, {name}!</Heading>

      <Text style={paragraph}>
        We&apos;re excited to have you on board. RunSolo is designed to help
        freelancers like you manage clients, track time, and handle invoicing
        &mdash; all in one place.
      </Text>

      <Text style={paragraph}>Here&apos;s what you can do to get started:</Text>

      <Section style={listContainer}>
        <Text style={listItem}>
          <strong>1. Add your first client</strong> &mdash; Keep all your client
          information organized
        </Text>
        <Text style={listItem}>
          <strong>2. Create a job</strong> &mdash; Track projects and their
          progress
        </Text>
        <Text style={listItem}>
          <strong>3. Start tracking time</strong> &mdash; Log your work hours
          effortlessly
        </Text>
        <Text style={listItem}>
          <strong>4. Send your first invoice</strong> &mdash; Get paid for your
          hard work
        </Text>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={dashboardUrl}>
          Go to Dashboard
        </Button>
      </Section>

      <Text style={secondary}>
        If you have any questions, feel free to reach out. We&apos;re here to
        help you succeed!
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

const listContainer = {
  marginBottom: '24px',
};

const listItem = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  marginBottom: '12px',
  marginTop: '0',
  paddingLeft: '8px',
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

const secondary = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '0',
  marginTop: '0',
};
