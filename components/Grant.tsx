import React from 'react';

interface GrantProps {
  size?: 'small' | 'medium' | 'large';
}

const styles = {
    boxShadow: '0px 3px 8px 0px rgba(49, 46, 69, 0.08)',
    borderRadius: '16px',
}

const imageStyles = {
    height: '104px',
    width: '104px',
    borderRadius: '12px',
}

/**
 * Primary UI component for user interaction
 */
export const Grant = ({
  size = 'medium',
  ...props
}: GrantProps) => {
  return (
    <div style={styles}>
        <img style={imageStyles} src="https://i.ibb.co/42V1xhP/earthcoin-initiative-logo.png"/>
        <span>
            <h3>EthStaker.tax</h3>
        </span>
        <span>
            <h4>By 0xFf74...A0B7</h4>
        </span>
    </div>
  );
};
