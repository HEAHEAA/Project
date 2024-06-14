import Logo from "../../../../assets/image/donghae-logo.png";
export const FootLogo = () => {
    return (
        <>
            {
                window.location.pathname === '/dashboard-edit/detail' ? null :
                    <div className="display-logo">
                        <img src={Logo} className="display-logo-img" alt="display-logo"/>
                    </div>
            }
        </>
    )
}
