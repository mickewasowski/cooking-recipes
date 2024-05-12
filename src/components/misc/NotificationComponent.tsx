
type IProps = {
    message: string;
    alert?: boolean;
    warning?: boolean;
    info?: boolean;
}

function NotificationComponent ({ message, alert, warning, info }: IProps) {

    return (
        <div className="notification">

        </div>
    )
}

export default NotificationComponent;
