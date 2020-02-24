// import React from "react";
// import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
// // react plugin used to create DropdownMenu for selecting items
// import Select from "react-select";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { Creatable } from "react-select";
// var selectOptions = [];

// class CreateSkill extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectOptions: [],
//       selectedValue: {
//         label: "",
//         value: ""
//       },
//       name: "",
//       id: "",
//       input: ""
//     };
//   }
//   changeHandler = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   changeHandler2 = event => {
//     this.setState({ selectedValue: event });

//     let MyselectOptions = this.state.selectOptions.map(item => ({
//       label: item.label
//     }));

//     for (let index = 0; index < MyselectOptions.length; index++) {
//       if (MyselectOptions[index].label == this.state.selectedValue.label) {
//         return this.setState({
//           input: "OK"
//         });
//       } else {
//         this.setState({
//           input: "NOT_OK"
//         });
//       }
//     }
//   };

//   componentDidMount() {
//     const decode = jwt_decode(localStorage.getItem("accessToken"));
//     axios.get("https://localhost:5001/api/skill").then(response => {
//       const selectOptions = response.data.map(item => ({
//         value: item.id,
//         label: item.name
//       }));
//       this.setState({ selectOptions });
//     });

//     console.log(this.state.selectedValue);
//   }

//   submitHandler = e => {
//     e.preventDefault();
//     axios
//       .post("https://localhost:5001/api/subskill", {
//         name: this.state.name,
//         skillid: this.state.selectedValue.value,
//         id: this.state.id,
//         clientid: parseInt(localStorage.getItem("decoded"))
//       })

//       .then(response => {
//         console.log("Hello world", response);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     console.log(this.selectedValue);

//     console.log(this.state.name);
//     console.log(this.state.input);

//     return (
//       <div>
//         <form onSubmit={this.submitHandler}>
//           <Row className="justify-content-center">
//             <Col xs={12} sm={7}>
//               <FormGroup>
//                 <Label>Skill name</Label>
//                 <Input type="text" />
//               </FormGroup>
//             </Col>
//             <Col xs={12} sm={3}>
//               <FormGroup>
//                 <Label> Proficiency</Label>
//                 <Input type="text" />
//               </FormGroup>
//             </Col>
//             <Col xs={12} sm={5}>
//               <FormGroup>
//                 <Label>City</Label>
//                 <Input type="text" />
//               </FormGroup>
//             </Col>
//             <Col xs={12} sm={5}>
//               <Label>Skills</Label>
//               <Select
//                 isClearable
//                 className="primary react-select"
//                 classNamePrefix="react-select"
//                 placeholder="Select skill"
//                 name="singleSelect"
//                 value={this.state.selectedValue}
//                 options={this.state.selectOptions}
//                 onChange={exvalue => this.setState({ selectedValue: exvalue })}
//               />
//               <Creatable
//                 isClearable
//                 onChange={this.changeHandler2}
//                 onInputChange={this.handleInputChange}
//                 options={this.state.selectOptions}
//               />
//             </Col>
//             <Col xs={12} sm={5}>
//   <input
//     placeholder="Sub-Skill Name"
//     type="text"
//     name="name"
//     value={this.state.name}
//     onChange={this.changeHandler}
//   />
//             </Col>
//             <Col xs={12} sm={5}>
//   <input
//     placeholder="id"
//     type="number"
//     name="id"
//     value={this.state.id}
//     onChange={this.changeHandler}
//   />
//             </Col>
//             <Button>go</Button>
//           </Row>
//         </form>
//       </div>
//     );
//   }
// }

// export default CreateSkill;
