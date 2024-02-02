import Button from 'ui/Button';
import Modal from 'ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Toggle opens="new-cabin">
        <Button>Add new Cabin</Button>
      </Modal.Toggle>
      <Modal.Window name="new-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
