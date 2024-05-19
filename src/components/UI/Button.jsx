/* eslint-disable react/prop-types */
export default function Button({children,cssClass,...props}){
    return <button className={cssClass} {...props}>{children}</button>
}