import UpdateVehicle from '../components/UpdateVehicle';

export default function UpdatePge({ query }) {
    return (
        <div>
            <UpdateVehicle id={query.id} />
        </div>
    )
}

