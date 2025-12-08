import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BalanceCard from '@/components/BalanceCard';


jest.mock('../public/assets/svgs/icons', () => ({
    Info: ({ className }: { className?: string }) => (
        <div data-testid="info-icon" className={className}>Info Icon</div>
    ),
}));

describe('BalanceCard', () => {
    const defaultProps = {
        label: 'Available Balance',
        amount: 120500.0,
    };

    describe('Rendering', () => {
        it('should render the component with required props', () => {
            render(<BalanceCard {...defaultProps} />);

            expect(screen.getByText('Available Balance')).toBeInTheDocument();
            expect(screen.getByText(/USD 120,500\.00/)).toBeInTheDocument();
        });

        it('should render label text correctly', () => {
            render(<BalanceCard label="Total Revenue" amount={50000} />);

            expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        });

        it('should apply correct styling to label', () => {
            render(<BalanceCard {...defaultProps} />);

            const label = screen.getByText('Available Balance');
            expect(label).toHaveClass('text-[0.875rem]');
            expect(label).toHaveClass('font-medium');
        });

        it('should apply correct styling to amount', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            const amountDiv = container.querySelector('.text-\\[1\\.75rem\\]');
            expect(amountDiv).toBeInTheDocument();
            expect(amountDiv).toHaveClass('font-bold');
            expect(amountDiv).toHaveClass('text-(--black)');
        });
    });

    describe('Currency Formatting', () => {
        it('should display default currency as USD', () => {
            render(<BalanceCard label="Balance" amount={1000} />);

            expect(screen.getByText(/USD 1,000\.00/)).toBeInTheDocument();
        });

        it('should display custom currency when provided', () => {
            render(<BalanceCard label="Balance" amount={5000} currency="EUR" />);

            expect(screen.getByText(/EUR 5,000\.00/)).toBeInTheDocument();
        });

        it('should format amount with 2 decimal places', () => {
            render(<BalanceCard label="Balance" amount={100} />);

            expect(screen.getByText(/100\.00/)).toBeInTheDocument();
        });

        it('should format large amounts with commas', () => {
            render(<BalanceCard label="Balance" amount={1234567.89} />);

            expect(screen.getByText(/USD 1,234,567\.89/)).toBeInTheDocument();
        });

        it('should handle whole numbers correctly', () => {
            render(<BalanceCard label="Balance" amount={500} />);

            expect(screen.getByText(/USD 500\.00/)).toBeInTheDocument();
        });

        it('should handle decimal amounts correctly', () => {
            render(<BalanceCard label="Balance" amount={123.456} />);

            expect(screen.getByText(/USD 123\.46/)).toBeInTheDocument();
        });

        it('should handle zero amount', () => {
            render(<BalanceCard label="Balance" amount={0} />);

            expect(screen.getByText(/USD 0\.00/)).toBeInTheDocument();
        });

        it('should handle very small amounts', () => {
            render(<BalanceCard label="Balance" amount={0.01} />);

            expect(screen.getByText(/USD 0\.01/)).toBeInTheDocument();
        });

        it('should handle amounts less than 1', () => {
            render(<BalanceCard label="Balance" amount={0.99} />);

            expect(screen.getByText(/USD 0\.99/)).toBeInTheDocument();
        });

        it('should handle very large amounts', () => {
            render(<BalanceCard label="Balance" amount={9999999999.99} />);

            expect(screen.getByText(/USD 9,999,999,999\.99/)).toBeInTheDocument();
        });
    });

    describe('Info Icon Display', () => {
        it('should show info icon by default', () => {
            render(<BalanceCard {...defaultProps} />);

            expect(screen.getByTestId('info-icon')).toBeInTheDocument();
        });

        it('should show info icon when showInfo is true', () => {
            render(<BalanceCard {...defaultProps} showInfo={true} />);

            expect(screen.getByTestId('info-icon')).toBeInTheDocument();
        });

        it('should hide info icon when showInfo is false', () => {
            render(<BalanceCard {...defaultProps} showInfo={false} />);

            expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
        });

        it('should apply correct styling to info icon', () => {
            render(<BalanceCard {...defaultProps} />);

            const infoIcon = screen.getByTestId('info-icon');
            expect(infoIcon).toHaveClass('inline-block');
            expect(infoIcon).toHaveClass('ml-2');
            expect(infoIcon).toHaveClass('mb-1');
        });
    });

    describe('Layout and Structure', () => {
        it('should render label and info icon in the same row', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            const headerDiv = container.querySelector('.flex.justify-between');
            expect(headerDiv).toBeInTheDocument();
        });

        it('should have proper spacing with mb-6 on container', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            const mainContainer = container.firstChild;
            expect(mainContainer).toHaveClass('mb-6');
        });

        it('should have margin top on amount display', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            const amountDiv = container.querySelector('.text-\\[1\\.75rem\\]');
            expect(amountDiv).toHaveClass('mt-2');
        });
    });

    describe('Props Combinations', () => {
        it('should work with all custom props', () => {
            render(
                <BalanceCard
                    label="Pending Payout"
                    amount={25000.5}
                    currency="GBP"
                    showInfo={false}
                />
            );

            expect(screen.getByText('Pending Payout')).toBeInTheDocument();
            expect(screen.getByText(/GBP 25,000\.50/)).toBeInTheDocument();
            expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
        });

        it('should handle different labels correctly', () => {
            const labels = [
                'Available Balance',
                'Ledger Balance',
                'Total Payout',
                'Total Revenue',
                'Pending Payout',
            ];

            labels.forEach((label) => {
                const { unmount } = render(<BalanceCard label={label} amount={1000} />);
                expect(screen.getByText(label)).toBeInTheDocument();
                unmount();
            });
        });

        it('should handle different currencies correctly', () => {
            const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'JPY'];

            currencies.forEach((currency) => {
                const { unmount } = render(
                    <BalanceCard label="Balance" amount={1000} currency={currency} />
                );
                expect(screen.getByText(new RegExp(`${currency} 1,000\\.00`))).toBeInTheDocument();
                unmount();
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle negative amounts', () => {
            render(<BalanceCard label="Balance" amount={-500} />);

            expect(screen.getByText(/USD -500\.00/)).toBeInTheDocument();
        });

        it('should handle empty label string', () => {
            render(<BalanceCard label="" amount={1000} />);

            expect(screen.getByText(/USD 1,000\.00/)).toBeInTheDocument();
        });

        it('should handle very long label text', () => {
            const longLabel = 'This is a very long label that might wrap to multiple lines';
            render(<BalanceCard label={longLabel} amount={1000} />);

            expect(screen.getByText(longLabel)).toBeInTheDocument();
        });

        it('should handle empty currency string', () => {
            render(<BalanceCard label="Balance" amount={1000} currency="" />);

            expect(screen.getByText(/1,000\.00/)).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('should render amount in a bold, prominent style for visibility', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            const amountDiv = container.querySelector('.font-bold');
            expect(amountDiv).toBeInTheDocument();
        });

        it('should maintain semantic HTML structure', () => {
            const { container } = render(<BalanceCard {...defaultProps} />);

            expect(container.querySelector('div')).toBeInTheDocument();
        });

        it('should render all content in proper hierarchy', () => {
            render(<BalanceCard {...defaultProps} />);

            const label = screen.getByText('Available Balance');
            const amount = screen.getByText(/USD 120,500\.00/);

            expect(label).toBeInTheDocument();
            expect(amount).toBeInTheDocument();
        });
    });
});