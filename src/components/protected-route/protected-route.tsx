import { Navigate, useLocation } from 'react-router-dom';
import { getAuthChecked, getLoading, getUser } from '../../services/auth/slice';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({ onlyUnAuth, component }: TProtectedProps) => {
  const isAuthChecked = useSelector(getAuthChecked);
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
