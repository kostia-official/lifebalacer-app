import { Link } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';

export const RefundPolicy = () => {
  return (
    <PageWrapper>
      <h2>Return and Refund Policy</h2>

      <p>The following terms are applicable for any products that You purchased with Us.</p>

      <h2>Interpretation and Definitions</h2>

      <h3>Interpretation</h3>
      <p>
        The words of which the initial letter is capitalized have meanings defined under the
        following conditions. The following definitions shall have the same meaning regardless of
        whether they appear in singular or in plural.
      </p>
      <h3>Definitions</h3>
      <p>For the purposes of this Return and Refund Policy:</p>
      <ul>
        <li>
          <p>
            <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;,
            &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Life Balancer.
          </p>
        </li>
        <li>
          <p>
            <strong>Goods</strong> refer to the items offered for sale on the Service.
          </p>
        </li>
        <li>
          <p>
            <strong>Orders</strong> mean a request by You to purchase Goods from Us.
          </p>
        </li>
        <li>
          <p>
            <strong>Service</strong> refers to the Website.
          </p>
        </li>
        <li>
          <p>
            <strong>Website</strong> refers to Life Balancer, accessible from{' '}
            <Link
              href="https://web.lifebalancer.app"
              rel="external nofollow noopener"
              target="_blank"
            >
              https://web.lifebalancer.app
            </Link>
          </p>
        </li>
        <li>
          <p>
            <strong>You</strong> means the individual accessing or using the Service, or the
            company, or other legal entity on behalf of which such individual is accessing or using
            the Service, as applicable.
          </p>
        </li>
      </ul>
      <h2>Your Order Cancellation Rights</h2>
      <p>
        You are entitled to cancel Your Order within 30 days without giving any reason for doing so.
      </p>
      <p>
        The deadline for cancelling an Order is 30 days from the date on which You received the
        Goods or on which a third party you have appointed, who is not the carrier, takes possession
        of the product delivered.
      </p>
      <p>
        In order to exercise Your right of cancellation, You must inform Us of your decision by
        means of a clear statement. You can inform us of your decision by:
      </p>
      <ul>
        <li>By email: admin@lifebalancer.app</li>
      </ul>
      <p>
        We will reimburse You no later than 14 days from the day on which We receive the returned
        Goods. We will use the same means of payment as You used for the Order, and You will not
        incur any fees for such reimbursement.
      </p>

      <h2>Conditions for Returns</h2>
      <p>In order for the Goods to be eligible for a return, please make sure that:</p>
      <ul>
        <li>The Goods were purchased in the last 30 days</li>
      </ul>

      <h3>Contact Us</h3>
      <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
      <ul>
        <li>By email: admin@lifebalancer.app</li>
      </ul>
    </PageWrapper>
  );
};
