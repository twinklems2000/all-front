import { useRoutes } from 'react-router-dom';
import { routeData } from '../../../constants/data';

const RootRoutes = () => {
  return useRoutes(routeData);
};

export default RootRoutes;
