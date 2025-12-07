import localFont from 'next/font/local';

const Degular = localFont({
    variable: '--degular',
    src: [
        {
            path: './DegularDemo-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './DegularDemo-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './DegularDemo-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './DegularDemo-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './DegularDemo-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './DegularDemo-Black.otf',
            weight: '800',
            style: 'normal',
        },
    ],
});

export default Degular;
