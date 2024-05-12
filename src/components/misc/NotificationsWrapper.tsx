import { useState, useEffect } from 'react';
import { FormEvents } from '../../utils/eventEmitterTypes';
import { emitter } from '../../App';

//TODO: refactor this into a wrapper
// add listeners to the redux store's state updates
// if there are any errors display a toast with the error
// close the toast in 5secs

//TODO: rename it to a Notification wrapper
// it will render Notification components array
// Notification component will have a prop for its color theme

type CreateNotification = {
  message: string;
  type: string;
}

const NotificationsWrapper = () => {
  const allNotifications = useState(new Map<string, JSX.Element>());

  const closeNotification = (notifId: string) => {
    //TODO: remove from map and update the state
    //clone the state, remove the notif and then update the state with the new map
  }

  const createNotification = ({ message, type }: CreateNotification) => { //message: string, type: string
    console.log(`%c ${message}`), 'color: cyan';
    console.log(`%c ${type}`), 'color: cyan';
    
    switch(type) {
      case 'alert': {
        
        break;
      }
      case 'warning': {
        break;
      }
      case 'info': {
        break;
      }
      default:
        break;
    }
  }

  const attachEventListeners = () => {
    emitter.on(FormEvents.AllFieldsRequired, createNotification);
    emitter.on(FormEvents.InvalidEmail, createNotification);
    emitter.on(FormEvents.PasswordsDontMatch, createNotification);
  }

  const detachEventListeners = () => {
    emitter.off(FormEvents.AllFieldsRequired, createNotification);
    emitter.off(FormEvents.InvalidEmail, createNotification);
    emitter.off(FormEvents.PasswordsDontMatch, createNotification);
  }

  useEffect(() => {
    attachEventListeners();
    return () => detachEventListeners();
  }, []);

  return (
    <div className='notifications-wrapper'>
      
    </div>
  );
};

export default NotificationsWrapper;
