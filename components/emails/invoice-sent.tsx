import { Button, Heading, Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout } from './layout';

interface InvoiceSentEmailProps {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  viewUrl: string;
}

export function InvoiceSentEmail({
  clientName,
  invoiceNumber,
  amount,
  dueDate,
  viewUrl,
}: InvoiceSentEmailProps) {
  return (
    <EmailLayout preview={`Invoice ${invoiceNumber} - ${amount} due ${dueDate}`}>
      <Heading style={heading}>New Invoice</Heading>

      <Text style={greeting}>Hi {clientName},</Text>

      <Text style={paragraph}>
        You have a new invoice from RunSolo. Please find the details below:
      </Text>

      <Section style={invoiceBox}>
        <Row>
          <Column style={labelColumn}>
            <Text style={label}>Invoice Number</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={value}>{invoiceNumber}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={labelColumn}>
            <Text style={label}>Amount Due</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={valueHighlight}>{amount}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={labelColumn}>
            <Text style={label}>Due Date</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={value}>{dueDate}</Text>
          </Column>
        </Row>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={viewUrl}>
          View Invoice
        </Button>
      </Section>

      <Text style={secondary}>
        If you have any questions about this invoice, please don&apos;t hesitate
        to get in touch.
      </Text>

      <Text style={signoff}>Thank you for your business!</Text>
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

const greeting = {
  fontSize: '16px',
  color: '#374151',
  marginBottom: '16px',
  marginTop: '0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  marginBottom: '24px',
  marginTop: '0',
};

const invoiceBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
};

const labelColumn = {
  width: '50%',
};

const valueColumn = {
  width: '50%',
  textAlign: 'right' as const,
};

const label = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '8px 0',
};

const value = {
  fontSize: '14px',
  color: '#0a0a0a',
  fontWeight: '500' as const,
  margin: '8px 0',
};

const valueHighlight = {
  fontSize: '18px',
  color: '#0a0a0a',
  fontWeight: '700' as const,
  margin: '8px 0',
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
  marginBottom: '16px',
  marginTop: '0',
};

const signoff = {
  fontSize: '14px',
  color: '#374151',
  fontWeight: '500' as const,
  marginBottom: '0',
  marginTop: '0',
};
