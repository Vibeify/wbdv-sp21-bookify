import { useRouteMatch } from "react-router";


const Layout = ({ children }) => {
    const { isExact: isHome } = useRouteMatch('/', { exact: true })
    console.log(isHome)
    return (<div className={`${isHome ? '' : 'px-3'} mt-4`}>
        {children}
    </div>
    )
}

export default Layout