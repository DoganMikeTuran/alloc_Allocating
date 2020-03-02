import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "reactstrap";

const MyTableCell = props => {
  if (props.column.name == "name") {
    return <TableCell>{props.row.name}</TableCell>;
  }
  if (props.column.name == "subscription") {
    return <TableCell>{props.row.subscription}</TableCell>;
  }
  if (props.column.name == "proficiency") {
    return <TableCell>{props.row.proficiency}</TableCell>;
  }
  if (props.column.name == "action") {
    // if (props.row.subscription == "Yes") {
    //   return (
    //     <TableCell>
    //       <Button>Edit{props.row.id}</Button>
    //     </TableCell>
    //   );
    // }
    return <TableCell>{props.row.action}</TableCell>;
  }
  return <TableCell>no data</TableCell>;
};
export default MyTableCell;
