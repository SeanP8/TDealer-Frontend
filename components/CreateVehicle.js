import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import {ALL_VEHICLE_QUERY} from './Vehicles'

const CREATE_VEHICLE_MUTATION = gql`
    mutation CREATE_VEHICLE_MUTATION(
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createVehicle(
            data:{
                name: $name
                description: $description
                price: $price
                status: "AVAILABLE"
                photo: {create: {image: $image, altText: $name}}
            }
        ) {
            id
            price
            description
            name
        }

    }
`;


export default function CreateVehicle() {

    // custom hook
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: 'Electric Car',
        price: 75255,
        description: 'Electric'
    });

    const [createVehicle, { loading, error, data }] = useMutation(CREATE_VEHICLE_MUTATION,
        {
            variables: inputs,
            refetchQueries: [{query: ALL_VEHICLE_QUERY}]
        });
    console.log(createVehicle);

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            await createVehicle();
            clearForm();

            Router.push({
                pathname: `/vehicle/${data.createVehicle.id}`,
            })
        }}>
            <DisplayError error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image"> Upload Image
                <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                />
            </label>
               <label htmlFor="name"> Name
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
                    placeholder="Price"
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

            <button type="submit">Add Product</button> 
            </fieldset>
            
        </Form>
    )
}