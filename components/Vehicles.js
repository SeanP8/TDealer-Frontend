import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { perPage } from "../config";
import styled from "styled-components";
import Vehicle from "./Vehicle";

export const ALL_VEHICLE_QUERY = gql`
    query ALL_VEHICLE_QUERY($skip: Int =0, $first: Int){
  allVehicles(first: $first, skip: $skip){
    id
    name
    price
    description
    photo {
      id
      image {
        publicUrlTransformed
      }
    }
  }
}
`;

const ProductListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;

`;

export default function Vehicles({page}) {
    // hook to fetch data
  const { data, error, loading } = useQuery(ALL_VEHICLE_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage
      }
    });
    if (loading) return <p>Loading....</p>;
    if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <ProductListStyles>
                {data.allVehicles.map((vehicle) => (
                    <Vehicle key={vehicle.id} vehicle={vehicle}/>
                ))}
            </ProductListStyles>
        </div>
    )
}