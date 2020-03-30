import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USERS = gql`
  {
    users {
      id
    }
  }
`;

export const CheckUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id }: {id:string}) => (
    <div key={id}>
      <p>
        {"id"}: {id}
      </p>
    </div>
  ));
}