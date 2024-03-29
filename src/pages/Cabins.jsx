import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperations from '../features/cabins/CabinTableOperations';
// import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import CreateCabinForm from '../features/cabins/CreateCabinForm';
import AddCabin from '../features/cabins/AddCabin';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <p>Filter/Sort</p> */}
        <CabinTableOperations />
        {/* <img src="https://gqksqpvrleidggknqarm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg" /> */}
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
