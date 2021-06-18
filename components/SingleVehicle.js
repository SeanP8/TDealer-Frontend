import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';


const VehicleStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        Vehicle(where: {id: $id}) {
            name
            price
            description
            id
            photo {
                id
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export default function SingleVehicle({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY,
        {
            variables: {id},

        }
    );
    if (loading) return <p>Loading... </p>;
    if (error) return <DisplayError error={error} />
    
    const { Vehicle } = data;
    return (
        <VehicleStyles>
            <Head>
                <title>Cars | { Vehicle.name}</title>
            </Head>
            <img src={Vehicle.photo.image.publicUrlTransformed}
                alt={ Vehicle.photo.altText}
            />
            <div>
                <h2 className="details">
                    {Vehicle.name}
                </h2>
                <p>{Vehicle.description }</p>
            </div>
        </VehicleStyles>
    )
}