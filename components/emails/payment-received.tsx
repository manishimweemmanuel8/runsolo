import { Heading, Text, Section, Row, Column } from '@react-email/components';
import { EmailLayout } from './layout';

interface PaymentReceivedEmailProps {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
}

export function PaymentReceivedEmail({
  clientName,
  invoiceNumber,
  amount,
  paymentDate,
  paymentMethod,
}: PaymentReceivedEmailProps) {
  return (
    <EmailLayout preview={`Payment received - ${amount} for Invoice ${invoiceNumber}`}>
      <Section style={successBanner}>
        <Text style={checkmark}>&#10003;</Text>
        <Text style={successText}>Payment Received</Text>
      </Section>

      <Text style={greeting}>Hi {clientName},</Text>

      <Text style={paragraph}>
        Thank you for your payment! We&apos;ve received your payment and your
        invoice has been marked as paid.
      </Text>

      <Section style={paymentBox}>
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
            <Text style={label}>Amount Paid</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={valueHighlight}>{amount}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={labelColumn}>
            <Text style={label}>Payment Date</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={value}>{paymentDate}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={labelColumn}>
            <Text style={label}>Payment Method</Text>
          </Column>
          <Column style={valueColumn}>
            <Text style={value}>{paymentMethod}</Text>
          </Column>
        </Row>
      </Section>

      <Text style={secondary}>
        This email serves as your payment confirmation. Please keep it for your
        records.
      </Text>

      <Text style={signoff}>Thank you for your business!</Text>
    </EmailLayout>
  );
}

const successBanner = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const checkmark = {
  fontSize: '48px',
  color: '#10b981',
  margin: '0 0 8px',
};

const successText = {
  fontSize: '20px',
  fontWeight: '600' as const,
  color: '#10b981',
  margin: '0',
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

const paymentBox = {
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  border: '1px solid #bbf7d0',
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
  color: '#059669',
  fontWeight: '700' as const,
  margin: '8px 0',
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
