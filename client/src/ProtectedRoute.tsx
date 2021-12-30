// import { createElement } from "react";
// import { Redirect, Route } from "react-router-dom";

// const ProtectedRoute: React.FC<any> = ({component, isAuthenticated, ...rest}) => {
//     const routeComponent = (props: any) => (
//         isAuthenticated
//             ? createElement(component, props)
//             : <Redirect to={{pathname: '/login'}}/>
//     );
//     return <Route {...rest} render={routeComponent}/>;
// }

import {Redirect, Route, RouteProps} from 'react-router';

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    redirectPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
    public render() {

        if(!this.props.isAuthenticated){
            const renderComponent = () => (<Redirect to={{pathname: this.props.redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        }

        return <Route {...this.props}/>;
    }
}