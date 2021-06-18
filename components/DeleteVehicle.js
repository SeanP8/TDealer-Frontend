import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_VEHICLE_MUTATION = gql`
  mutation DELETE_VEHICLE_MUTATION($id: ID!) {
    deleteVehicle(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteVehicle));
}

export default function DeleteVehicle({ id, children }) {
  const [deleteVehicle, { loading, error }] = useMutation(
    DELETE_VEHICLE_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it
          console.log('DELTEE');
          deleteVehicle().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
