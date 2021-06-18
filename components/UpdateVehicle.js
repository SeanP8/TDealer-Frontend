import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';


const SINGLE_VEHICLE_QUERY = gql`
    query SINGLE_VEHICLE_QUERY($id: ID!) {
        Vehicle(where: {id: $id}) {
            id
            name
            description
            price
        }
    }
`;

const UPDATE_VEHICLE_MUTATION = gql`
    mutation UPDATE_VEHICLE_MUTATION(
        $id: ID!
    $name: String
    $description: String
    $price: Int
    ) {
        updateVehicle(
            id: $id
            data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
    }
    
`;

export default function UpdateVehicle({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_VEHICLE_QUERY, {
    variables: { id },
  });
  // 2. We need to get the mutation to update the product
  const [
    updateVehicle,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_VEHICLE_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Vehicle);
  console.log(inputs);
  if (loading) return <p>loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateVehicle({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Vehicle</button>
      </fieldset>
    </Form>
  );
}