//src/Components/ToysTableRow.js

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ToysTableRow =
    (props) => {
        const {
                id,
                name,
                category,
                status,
                notes,
                lastRotated,
                image,
        } = props.obj;
 const navigate = useNavigate();
 const rotateItem=()=>{
  if (window.confirm("Are you sure you want to rotate this item?")) {
            axios
      .patch(`http://localhost:8081/item/rotate`,
        props.obj,                 // data goes second
        { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          alert("Toy details successfully updated");
          window.location.reload();
          //navigate("/toy-list");  // ✅ Redirect using navigate
        } else {
          return Promise.reject();
        }
      })
      .catch(() => alert("Something went wrong"));
        };
 }
 const deleteItem = () => {

  if (window.confirm("Are you sure you want to delete this item?")) {
            axios
                .delete(
"http://localhost:8081/item/" + id)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Student successfully deleted");
                        window.location.reload();
                    } else Promise.reject();
                })
                .catch(
                    (err) =>
                        alert("Something went wrong"));
        };
}
        return (
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{notes}</td>
                <td>{status}</td>
                <td>{lastRotated}</td>
                <td>{image}</td>
                <td className="actionsColumn">
  <Button
    variant="primary"
    size="sm"
    className="edit-link"
    onClick={() => navigate(`/edit-toy/${id}`)}
  >
    Edit
  </Button>

  <Button
    variant="danger"
    size="sm"
    className="deleteButton"
    onClick={deleteItem}
  >
    Delete
  </Button>
  <Button
    variant="text"
    size="sm"
    className="rotateButton"
    onClick={rotateItem}
    
  >
    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotateToyIcon">
  <polyline points="1 4 1 10 7 10"/>
  <title>Rotate Toy</title>
  <path d="M3.51 15a9 9 0 1 0 2.13-9"/>
</svg>

  </Button>
</td>

            </tr>
        );
    };

export default ToysTableRow;