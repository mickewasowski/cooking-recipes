import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/user/user.selector";
import { IRootState } from "../store/root-reducer";
import { Navigate } from "react-router-dom";
import React from "react";

export const isAuth = <P extends object>(Component: React.ComponentType<P>) => {
    const EnhancedComponent = (props: P) => {
        const user = useSelector((state: IRootState) => getCurrentUser(state.user));

        return user 
        ? <Component {...props} />
        : <Navigate to='/' />;
    }

    return EnhancedComponent;
}