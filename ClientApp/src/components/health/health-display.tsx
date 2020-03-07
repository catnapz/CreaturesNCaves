import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckHealthButton } from './check-health-button';
import { selectHealthCheckLoading, selectHealthy, checkHealth } from './health-store.slice';

export const HealthDisplay = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectHealthCheckLoading);
  const healthy = useSelector(selectHealthy);
  let status: string;

  useEffect(() => {
    dispatch(checkHealth());
  }, []);

  if (loading) {
    status = 'CHECKING';
  } else if (healthy) {
    status = 'HEALTHY';
  } else {
    status = 'UNHEALTHY';
  }

  return (
    <>
      <div>
        <div>
          <p> I am <strong> {status} </strong> </p>
          <CheckHealthButton />
        </div>
      </div>
    </>
  );
};

