import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import Vehicles from "../../components/Vehicles";


export default function VehiclesPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1}/>
      <Vehicles page={page || 1 }/>
      <Pagination page={page || 1}/>
    </div>
  )
}