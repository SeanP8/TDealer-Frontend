/* eslint-disable */
import ItemStyles from './styles/ItemStyles';
import Link from 'next/link';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteVehicle from './DeleteVehicle';
import AddToCart from './AddToCart';

export default function Vehicle({ vehicle }) {
  return (
    <ItemStyles>
      <img
        src={vehicle?.photo?.image?.publicUrlTransformed}
        alt={vehicle.name}
      />
      <Title>
        <Link href={`/vehicle/${vehicle.id}`}> { vehicle.name } </Link>
      </Title>
      <PriceTag>{formatMoney(vehicle.price)}</PriceTag>
      <p>{vehicle.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: {
                id: vehicle.id,
              },
            }}
          >
            Edit
          </Link>
          <AddToCart id={vehicle.id} />
          <DeleteVehicle id={vehicle.id }>Delete</DeleteVehicle>
        </div>
    </ItemStyles>
    
  );
}
