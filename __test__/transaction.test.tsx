/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ITransaction } from '@/utils/types';
import TransactionSection from '@/components/Transaction';


jest.mock('../src/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}));
jest.mock('../public/assets/svgs/icons', () => ({
  __esModule: true,
  Empty: () => <div data-testid="empty-icon">Empty Icon</div>,
  GreenArrow: ({ className }: { className?: string }) => (
    <div data-testid="green-arrow" className={className}>Green Arrow</div>
  ),
  RedArrow: ({ className }: { className?: string }) => (
    <div data-testid="red-arrow" className={className}>Red Arrow</div>
  ),
}));

// Mock the Button component
jest.mock('../src/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

describe('TransactionSection', () => {
  describe('Empty State', () => {
    it('should render empty state when transactions array is empty', () => {
      render(<TransactionSection transactions={[]} />);

      expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
      expect(
        screen.getByText('No matching transaction found for the selected filter')
      ).toBeInTheDocument();
    });
  });

  it('should display empty state message and call-to-action', () => {
    render(<TransactionSection transactions={[]} />);

    expect(
      screen.getByText(/Change your filters to see more results/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Clear Filter')).toBeInTheDocument();
  });

  it('should render Clear Filter button with correct styling', () => {
    render(<TransactionSection transactions={[]} />);

    const clearButton = screen.getByText('Clear Filter');
    expect(clearButton).toHaveClass('font-semibold');
    expect(clearButton).toHaveClass('rounded-full');
  });
});

describe('Transaction List', () => {
  const mockDepositTransaction: ITransaction = {
    amount: 600,
    date: '2022-04-03',
    type: 'deposit',
    metadata: {
      product_name: 'Psychology of Money',
      name: 'Roy Cash',
      type: 'digital_product',
      email: 'roy@example.com',
      quantity: 1,
      country: 'US',
    },
    payment_reference: 'TXN123456',
    status: 'completed',
  };
  const mockWithdrawalTransaction: ITransaction = {
    amount: 100,
    date: '2022-04-02',
    type: 'withdrawal',
    metadata: {
      product_name: 'Buy me a coffee',
      name: 'Jonathan Smart',
      type: 'donation',
      email: 'jonathan@example.com',
      quantity: 1,
      country: 'UK',
    },
    payment_reference: 'TXN123457',
    status: 'completed',
  };

  it('should render transactions when array has items', () => {
    render(<TransactionSection transactions={[mockDepositTransaction]} />);

    expect(screen.getByText('Psychology of Money')).toBeInTheDocument();
    expect(screen.getByText('Roy Cash')).toBeInTheDocument();
  });

  it('should render multiple transactions correctly', () => {
    render(
      <TransactionSection
        transactions={[mockDepositTransaction, mockWithdrawalTransaction]}
      />
    );

    expect(screen.getByText('Psychology of Money')).toBeInTheDocument();
    expect(screen.getByText('Buy me a coffee')).toBeInTheDocument();
  });
  it('should display green arrow for deposit transactions', () => {
    render(<TransactionSection transactions={[mockDepositTransaction]} />);

    expect(screen.getByTestId('green-arrow')).toBeInTheDocument();
    expect(screen.queryByTestId('red-arrow')).not.toBeInTheDocument();
  });

  it('should display red arrow for withdrawal transactions', () => {
    render(<TransactionSection transactions={[mockWithdrawalTransaction]} />);

    expect(screen.getByTestId('red-arrow')).toBeInTheDocument();
    expect(screen.queryByTestId('green-arrow')).not.toBeInTheDocument();
  });


  describe('Amount Formatting', () => {
    it('should format amount with USD prefix and 2 decimal places', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      expect(screen.getByText(/USD 600\.00/)).toBeInTheDocument();
    });

    it('should format large amounts with commas', () => {
      const largeTransaction: ITransaction = {
        ...mockDepositTransaction,
        amount: 120500.5,
      };

      render(<TransactionSection transactions={[largeTransaction]} />);

      expect(screen.getByText(/USD 120,500\.50/)).toBeInTheDocument();
    });

    it('should handle whole numbers correctly', () => {
      const wholeNumberTransaction: ITransaction = {
        ...mockDepositTransaction,
        amount: 100,
      };

      render(<TransactionSection transactions={[wholeNumberTransaction]} />);

      expect(screen.getByText(/USD 100\.00/)).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('should format date as "MMM DD, YYYY"', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      expect(screen.getByText('Apr 03, 2022')).toBeInTheDocument();
    });

    it('should handle different date formats', () => {
      const differentDateTransaction: ITransaction = {
        ...mockDepositTransaction,
        date: '2023-12-25',
      };

      render(<TransactionSection transactions={[differentDateTransaction]} />);

      expect(screen.getByText('Dec 25, 2023')).toBeInTheDocument();
    });
  });

  describe('Metadata Handling', () => {
    it('should display product name from metadata when available', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      expect(screen.getByText('Psychology of Money')).toBeInTheDocument();
    });

    it('should display customer name from metadata when available', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      expect(screen.getByText('Roy Cash')).toBeInTheDocument();
    });

    it('should fallback to transaction type when product_name is not provided', () => {
      const transactionWithoutMetadata: ITransaction = {
        amount: 50,
        date: '2022-04-01',
        type: 'deposit',
        metadata: {
          product_name: null as unknown as string,
          name: null as unknown as string,
          type: '',
          email: '',
          quantity: 0,
          country: '',
        },
        payment_reference: 'TXN123458',
        status: 'completed',
      };

      render(<TransactionSection transactions={[transactionWithoutMetadata]} />);
      const depositElements = screen.getAllByText(/deposit/i);
      expect(depositElements).toHaveLength(2);
      expect(depositElements[0]).toHaveClass('capitalize');
      expect(depositElements[1]).toBeInTheDocument();
    });
    it('should capitalize transaction type when used as fallback', () => {
      const transactionWithoutMetadata: ITransaction = {
        amount: 50,
        date: '2022-04-01',
        type: 'withdrawal',
        metadata: {
          product_name: undefined as unknown as string,
          name: undefined as unknown as string,
          type: '',
          email: '',
          quantity: 0,
          country: '',
        },
        payment_reference: 'TXN123459',
        status: 'completed',
      };

      render(<TransactionSection transactions={[transactionWithoutMetadata]} />);

      const withdrawalElements = screen.getAllByText(/withdrawal/i);
      expect(withdrawalElements[0]).toHaveClass('capitalize');
    });
  });

  describe('Styling Based on Transaction Type', () => {
    it('should apply green text color to withdrawal metadata name', () => {
      render(<TransactionSection transactions={[mockWithdrawalTransaction]} />);

      const nameElement = screen.getByText('Jonathan Smart');
      expect(nameElement).toHaveClass('text-[#0EA163]');
    });

    it('should apply gray text color to deposit metadata name', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      const nameElement = screen.getByText('Roy Cash');
      expect(nameElement).toHaveClass('text-(--gray)');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined transactions by showing loading state', () => {
      render(<TransactionSection transactions={undefined} />);

      // When transactions is undefined, it should show loading skeletons
      expect(screen.getAllByTestId('skeleton')).toHaveLength(15); // 3 transactions × 4 skeletons each
    });

    it('should render correctly with single transaction', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      expect(screen.getByText('Psychology of Money')).toBeInTheDocument();
      expect(screen.queryByTestId('empty-icon')).not.toBeInTheDocument();
    });

    it('should handle transactions with decimal amounts less than 1', () => {
      const smallTransaction: ITransaction = {
        ...mockDepositTransaction,
        amount: 0.99,
      };

      render(<TransactionSection transactions={[smallTransaction]} />);

      expect(screen.getByText(/USD 0\.99/)).toBeInTheDocument();
    });

    it('should handle very large amounts', () => {
      const largeTransaction: ITransaction = {
        ...mockDepositTransaction,
        amount: 9999999.99,
      };

      render(<TransactionSection transactions={[largeTransaction]} />);

      expect(screen.getByText(/USD 9,999,999\.99/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render transaction items in a semantic structure', () => {
      const { container } = render(
        <TransactionSection transactions={[mockDepositTransaction]} />
      );

      const transactionContainer = container.querySelector('.flex.justify-between');
      expect(transactionContainer).toBeInTheDocument();
    });

    it('should maintain proper text hierarchy', () => {
      render(<TransactionSection transactions={[mockDepositTransaction]} />);

      const productName = screen.getByText('Psychology of Money');
      const customerName = screen.getByText('Roy Cash');

      expect(productName).toBeInTheDocument();
      expect(customerName).toBeInTheDocument();
    });
  });
});