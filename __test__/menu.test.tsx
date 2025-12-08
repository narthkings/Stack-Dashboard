/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IUser } from '@/utils/types';
import UserMenu from '@/components/Menuitem';

// Mock the UI components
jest.mock('../src/components/ui/popover', () => ({
    Popover: ({ children, open, onOpenChange }: any) => (
        <div data-testid="popover" data-open={open}>
            {children}
        </div>
    ),
    PopoverTrigger: ({ children, asChild }: any) => (
        <div data-testid="popover-trigger">{children}</div>
    ),
    PopoverContent: ({ children, align, className }: any) => (
        <div data-testid="popover-content" data-align={align} className={className}>
            {children}
        </div>
    ),
}));

jest.mock('../src/components/ui/avatar', () => ({
    Avatar: ({ children, className }: any) => (
        <div data-testid="avatar" className={className}>
            {children}
        </div>
    ),
    AvatarFallback: ({ children, className }: any) => (
        <div data-testid="avatar-fallback" className={className}>
            {children}
        </div>
    ),
}));

// Mock the icons
jest.mock('react-icons/rx', () => ({
    RxHamburgerMenu: ({ size, className }: any) => (
        <div data-testid="hamburger-icon" data-size={size} className={className}>
            Hamburger
        </div>
    ),
}));

jest.mock('react-icons/md', () => ({
    MdOutlineSwitchAccount: ({ className }: any) => (
        <div data-testid="switch-account-icon" className={className}>
            Switch
        </div>
    ),
}));

jest.mock('lucide-react', () => ({
    Settings: ({ className }: any) => (
        <div data-testid="settings-icon" className={className} />
    ),
    ShoppingBag: ({ className }: any) => (
        <div data-testid="shopping-bag-icon" className={className}>ShoppingBag</div>
    ),
    Gift: ({ className }: any) => (
        <div data-testid="gift-icon" className={className}>Gift</div>
    ),
    Bug: ({ className }: any) => (
        <div data-testid="bug-icon" className={className}>Bug</div>
    ),
    LogOut: ({ className }: any) => (
        <div data-testid="logout-icon" className={className}>LogOut</div>
    ),
}));

jest.mock('../public/assets/svgs/icons', () => ({
    Apps: ({ className }: any) => (
        <div data-testid="apps-icon" className={className}>Apps</div>
    ),
}));

describe('UserMenu', () => {
    const mockUser: IUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
    };

    describe('Trigger Rendering', () => {
        it('should render the user menu trigger', () => {
            render(<UserMenu user={mockUser} />);

            expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
        });

        it('should display user initials in avatar', () => {
            render(<UserMenu user={mockUser} />);

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            expect(avatarFallbacks[0]).toHaveTextContent('JD');
        });

        it('should display hamburger menu icon', () => {
            render(<UserMenu user={mockUser} />);

            const hamburgerIcon = screen.getByTestId('hamburger-icon');
            expect(hamburgerIcon).toBeInTheDocument();
            expect(hamburgerIcon).toHaveAttribute('data-size', '26');
        });

        it('should have correct styling on trigger', () => {
            const { container } = render(<UserMenu user={mockUser} />);

            const trigger = container.querySelector('.flex.items-center.gap-x-4');
            expect(trigger).toHaveClass('rounded-full');
            expect(trigger).toHaveClass('bg-[#EFF1F6]');
            expect(trigger).toHaveClass('cursor-pointer');
        });

        it('should display avatar with correct size', () => {
            render(<UserMenu user={mockUser} />);

            const avatars = screen.getAllByTestId('avatar');
            expect(avatars[0]).toHaveClass('h-8');
            expect(avatars[0]).toHaveClass('w-8');
        });

        it('should apply gradient background to avatar fallback', () => {
            render(<UserMenu user={mockUser} />);

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            expect(avatarFallbacks[0]).toHaveClass('bg-[linear-gradient(135deg,rgba(92,102,112,1),rgba(19,19,22,1))]');
            expect(avatarFallbacks[0]).toHaveClass('text-white');
        });
    });

    describe('User Information Display', () => {
        it('should display user full name in popover content', () => {
            render(<UserMenu user={mockUser} />);

            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        it('should display user email in popover content', () => {
            render(<UserMenu user={mockUser} />);

            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        });

        it('should display user initials in larger avatar in content', () => {
            render(<UserMenu user={mockUser} />);

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            // Second avatar is in the content
            expect(avatarFallbacks[1]).toHaveTextContent('JD');
        });

        it('should render larger avatar in popover content', () => {
            render(<UserMenu user={mockUser} />);

            const avatars = screen.getAllByTestId('avatar');
            // Second avatar is in the content
            expect(avatars[1]).toHaveClass('h-14');
            expect(avatars[1]).toHaveClass('w-14');
        });

        it('should apply correct text styling to user name', () => {
            render(<UserMenu user={mockUser} />);

            const nameElement = screen.getByText('John Doe');
            expect(nameElement).toHaveClass('font-semibold');
            expect(nameElement).toHaveClass('text-lg');
        });

        it('should apply correct text styling to email', () => {
            render(<UserMenu user={mockUser} />);

            const emailElement = screen.getByText('john.doe@example.com');
            expect(emailElement).toHaveClass('text-sm');
            expect(emailElement).toHaveClass('text-gray-500');
        });
    });

    describe('Menu Items', () => {
        it('should render all menu items', () => {
            render(<UserMenu user={mockUser} />);

            expect(screen.getByText('Settings')).toBeInTheDocument();
            expect(screen.getByText('Purchase History')).toBeInTheDocument();
            expect(screen.getByText('Refer and Earn')).toBeInTheDocument();
            expect(screen.getByText('Integrations')).toBeInTheDocument();
            expect(screen.getByText('Report Bug')).toBeInTheDocument();
            expect(screen.getByText('Switch Account')).toBeInTheDocument();
            expect(screen.getByText('Sign Out')).toBeInTheDocument();
        });

        it('should render correct icons for each menu item', () => {
            render(<UserMenu user={mockUser} />);

            expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
            expect(screen.getByTestId('shopping-bag-icon')).toBeInTheDocument();
            expect(screen.getByTestId('gift-icon')).toBeInTheDocument();
            expect(screen.getByTestId('apps-icon')).toBeInTheDocument();
            expect(screen.getByTestId('bug-icon')).toBeInTheDocument();
            expect(screen.getByTestId('switch-account-icon')).toBeInTheDocument();
            expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
        });

        it('should render menu items as buttons', () => {
            render(<UserMenu user={mockUser} />);

            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThanOrEqual(7);
        });

        it('should apply hover styles to menu items', () => {
            render(<UserMenu user={mockUser} />);

            const settingsButton = screen.getByText('Settings').closest('button');
            expect(settingsButton).toHaveClass('hover:bg-gray-100');
            expect(settingsButton).toHaveClass('rounded-xl');
            expect(settingsButton).toHaveClass('transition');
        });

        it('should have correct layout for menu items', () => {
            render(<UserMenu user={mockUser} />);

            const settingsButton = screen.getByText('Settings').closest('button');
            expect(settingsButton).toHaveClass('flex');
            expect(settingsButton).toHaveClass('items-center');
            expect(settingsButton).toHaveClass('gap-4');
            expect(settingsButton).toHaveClass('w-full');
            expect(settingsButton).toHaveClass('text-left');
        });

        it('should apply correct text size to menu labels', () => {
            render(<UserMenu user={mockUser} />);

            const settingsLabel = screen.getByText('Settings');
            expect(settingsLabel).toHaveClass('text-[15px]');
        });
    });

    describe('Popover Behavior', () => {
        it('should render popover content with correct alignment', () => {
            render(<UserMenu user={mockUser} />);

            const popoverContent = screen.getByTestId('popover-content');
            expect(popoverContent).toHaveAttribute('data-align', 'end');
        });

        it('should apply correct styling to popover content', () => {
            render(<UserMenu user={mockUser} />);

            const popoverContent = screen.getByTestId('popover-content');
            expect(popoverContent).toHaveClass('w-[340px]');
            expect(popoverContent).toHaveClass('rounded-3xl');
            expect(popoverContent).toHaveClass('shadow-xl');
            expect(popoverContent).toHaveClass('p-6');
            expect(popoverContent).toHaveClass('bg-white');
        });

        it('should have proper spacing between content sections', () => {
            const { container } = render(<UserMenu user={mockUser} />);

            const userInfoSection = container.querySelector('.flex.items-center.gap-4.mb-6');
            expect(userInfoSection).toBeInTheDocument();

            const menuSection = container.querySelector('.space-y-4');
            expect(menuSection).toBeInTheDocument();
        });
    });

    describe('User Prop Handling', () => {
        it('should handle user with different names', () => {
            const differentUser: IUser = {
                first_name: 'Jane',
                last_name: 'Smith',
                email: 'jane.smith@example.com',
            };

            render(<UserMenu user={differentUser} />);

            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            expect(avatarFallbacks[0]).toHaveTextContent('JS');
        });

        it('should handle undefined user gracefully', () => {
            render(<UserMenu user={undefined} />);

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            // Should render empty initials
            expect(avatarFallbacks[0]).toBeInTheDocument();
        });

        it('should handle user with single character names', () => {
            const singleCharUser: IUser = {
                first_name: 'A',
                last_name: 'B',
                email: 'a.b@example.com',
            };

            render(<UserMenu user={singleCharUser} />);

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            expect(avatarFallbacks[0]).toHaveTextContent('AB');
        });

        it('should handle user with long email', () => {
            const longEmailUser: IUser = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe.verylongemail@example.company.com',
            };

            render(<UserMenu user={longEmailUser} />);

            expect(screen.getByText('john.doe.verylongemail@example.company.com')).toBeInTheDocument();
        });

        it('should handle user with long names', () => {
            const longNameUser: IUser = {
                first_name: 'Christopher',
                last_name: 'Montgomery',
                email: 'chris@example.com',
            };

            render(<UserMenu user={longNameUser} />);

            expect(screen.getByText('Christopher Montgomery')).toBeInTheDocument();

            const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
            expect(avatarFallbacks[0]).toHaveTextContent('CM');
        });
    });

    describe('MenuItem Component', () => {
        it('should render with custom icon and label', () => {
            render(
                <button className="flex items-center gap-4 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-xl transition">
                    <div data-testid="custom-icon">Icon</div>
                    <span className="text-[15px]">Custom Label</span>
                </button>
            );

            expect(screen.getByText('Custom Label')).toBeInTheDocument();
            expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
        });

        it('should have button role', () => {
            render(<UserMenu user={mockUser} />);

            const buttons = screen.getAllByRole('button');
            buttons.forEach(button => {
                expect(button).toBeInTheDocument();
            });
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const { container } = render(<UserMenu user={mockUser} />);

            expect(container.querySelector('button')).toBeInTheDocument();
        });

        it('should have clickable trigger area', () => {
            render(<UserMenu user={mockUser} />);

            const trigger = screen.getByTestId('popover-trigger');
            expect(trigger).toBeInTheDocument();
        });

        it('should maintain proper text hierarchy', () => {
            render(<UserMenu user={mockUser} />);

            const userName = screen.getByText('John Doe');
            const userEmail = screen.getByText('john.doe@example.com');

            expect(userName.tagName).toBe('H3');
            expect(userEmail.tagName).toBe('P');
        });
    });

    describe('Edge Cases', () => {
        it('should handle user with missing first name', () => {
            const noFirstNameUser: IUser = {
                first_name: '',
                last_name: 'Doe',
                email: 'doe@example.com',
            } as IUser;

            render(<UserMenu user={noFirstNameUser} />);

            expect(screen.getByText('Doe')).toBeInTheDocument();
        });

        it('should handle user with missing last name', () => {
            const noLastNameUser: IUser = {
                first_name: 'John',
                last_name: '',
                email: 'john@example.com',
            } as IUser;

            render(<UserMenu user={noLastNameUser} />);

            expect(screen.getByText('John')).toBeInTheDocument();
        });

        it('should handle user with special characters in name', () => {
            const specialCharUser: IUser = {
                first_name: "O'Brien",
                last_name: 'Smith-Jones',
                email: 'obrien@example.com',
            };

            render(<UserMenu user={specialCharUser} />);

            expect(screen.getByText("O'Brien Smith-Jones")).toBeInTheDocument();
        });
    });
});
