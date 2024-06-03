import { useExpenses } from "@hooks/useExpenses";
import { Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi2";



const DeleteButton = ({ id }) => {

    const { deleteMovement }  = useExpenses();

    return (
        <Button onClick={() => deleteMovement(id)} outline gradientDuoTone="pinkToOrange" className="m-auto">
            <HiTrash />
        </Button>
    )
}

export default DeleteButton;