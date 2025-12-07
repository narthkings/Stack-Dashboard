import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={17}
        height={12}
        viewBox="0 0 17 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g />
        <path d="M16.784 10.755a3.148 3.148 0 1 0 .001 6.295 3.148 3.148 0 0 0-.001-6.295m0 5.245a2.1 2.1 0 0 1 0-4.197 2.1 2.1 0 0 1 0 4.197" />
        <path d="M4.196 6.034v15.735h25.176V6.034zm24.128 3.549V20.72H5.246V7.083h23.078z" />
        <path d="M23.746 22.819H3.147V8.133H2.098v15.735h25.177v-1.049h-1.049z" />
        <path d="M21.648 24.917H1.049V10.231H0v15.735h25.177v-1.049h-1.049zM6.819 8.165h3.147v1.049H6.819z" />
        <path d="M6.819 18.623h3.147v1.049H6.819zM23.603 8.165h3.147v1.049h-3.147zm0 10.458h3.147v1.049h-3.147z" />
    </svg>
);
export default SVGComponent;
