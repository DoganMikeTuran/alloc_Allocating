import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";
import { CreatableSelect } from "@atlaskit/select";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Creatable } from "react-select";
import Panelheader from "../../components/PanelHeader/PanelHeader";
import apiFacade from "../../auth/apiFacade";

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});

async function createUpdate(newOption, config) {
  await axios
    .post(
      "https://localhost:5001/api/skill",
      {
        name: newOption.label,
        clientid: parseInt(localStorage.getItem("decoded"))
      },
      config
    )

    .then(response => {
      console.log("Hello world post response", response);
    });
  await console.log("trin 2");
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  await console.log("den har nu ventet 5 sekunder");
  let data = await apiFacade.getData("skill/100001").then(data => {
    console.log(data);
    return data;
  });
  return data;
}

async function createUpdateSubSkill(newOption, config, newSkillid) {
  await axios
    .post(
      "https://localhost:5001/api/subskill",
      {
        name: newOption.label,
        clientid: parseInt(localStorage.getItem("decoded")),
        skillid: newSkillid
      },
      config
    )

    .then(response => {
      console.log("Hello world post response", response);
    })
    .catch(error => {
      console.log(error);
    });
  await console.log("trin 2");
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  await console.log("den har nu ventet 5 sekunder");

  let data = await axios
    .post(
      "https://localhost:5001/api/subskill/get",
      {
        clientid: parseInt(localStorage.getItem("decoded")),
        skillid: newSkillid
      },
      config
    )
    .then(response => {
      return response.data;
    });
  await console.log(data);
  return data;
}

class CreateSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      selectOptionsSubSkill: [],
      name: "",
      id: "",
      input: "",
      isLoadingSkill: false,
      isLoadingSubSkill: false,
      value: undefined,
      value2: undefined
    };
  }

  componentDidMount() {
    apiFacade.getData("skill/100001").then(response => {
      console.log(response);
      const selectOptions = response.map(item => ({
        value: item.id,
        label: item.name
      }));
      this.setState({ selectOptions });
    });
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
      }
    };
    axios
      .post(
        "https://localhost:5001/api/subskill",
        {
          name: this.state.name,
          skillid: this.state.value.value,
          clientid: parseInt(localStorage.getItem("decoded"))
        },
        config
      )

      .then(response => {
        console.log("Hello world", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue }, newState => {});

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
      }
    };
    if (newValue != null) {
      axios
        .post(
          "https://localhost:5001/api/subskill/get",
          {
            clientid: parseInt(localStorage.getItem("decoded")),
            skillid: newValue.value
          },
          config
        )
        .then(response => {
          const selectOptionsSubSkill = response.data.map(item => ({
            value: item.id,
            label: item.name
          }));
          console.log(selectOptionsSubSkill);
          this.setState({ selectOptionsSubSkill: selectOptionsSubSkill });
        });
    }
  };
  handleChange2 = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value2: newValue }, newState => {
      console.log(this.state.value2);
      console.log(this.state.value);
    });
  };

  // ------------------------------- SKILL CREATING ------------------------------------->
  handleCreate = inputValue => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    this.setState({ isLoadingSkill: true });
    console.group("Option created");
    console.log("Wait a moment...");
    const { selectOptions } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption.value);
    console.groupEnd();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
      }
    };
    createUpdate(newOption, config).then(resolve => {
      console.log(resolve);
      const newselectOptions = resolve.map(item => ({
        value: item.id,
        label: item.name
      }));
      for (let index = 0; index < newselectOptions.length; index++) {
        if (newselectOptions[index].label === newOption.label) {
          console.log(newselectOptions[index].value);
          newOption.value = newselectOptions[index].value;
          console.log(newOption);
          console.log(newselectOptions[index].value);
          console.log("inde i IF");
          this.state.selectOptionsSubSkill = [];
          this.setState({
            isLoadingSkill: false,
            selectOptions: [...newselectOptions],
            value: newOption
          });
        }
      }
    });
  };
  // ------------------------------------------------------------------------------------------------>
  handleCreate2 = inputValue => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    this.setState({ isLoadingSubSkill: true });
    console.group("Option created");
    console.log("Wait a moment...");
    const { selectOptions } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
      }
    };
    createUpdateSubSkill(newOption, config, this.state.value.value).then(
      resolve => {
        const selectOptionsSubSkill = resolve.map(item => ({
          value: item.id,
          label: item.name
        }));
        this.setState({ selectOptionsSubSkill });

        for (let index = 0; index < selectOptionsSubSkill.length; index++) {
          if (selectOptionsSubSkill[index].label === newOption.label) {
            console.log(selectOptionsSubSkill[index].value);
            newOption.value = selectOptionsSubSkill[index].value;
            console.log(newOption);
            console.log(selectOptionsSubSkill[index].value);
            this.setState({
              isLoadingSubSkill: false,
              selectOptionsSubSkill: [...selectOptionsSubSkill],
              value2: newOption
            });
          }
        }
      }
    );

    console.log(newOption);
  };
  render() {
    const { isLoadingSkill, isLoadingSubSkill, value } = this.state;
    return (
      <div>
        <Panelheader size="sm" />
        <div className="content">
          <form onSubmit={this.submitHandler}>
            <Row>
              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle>Select or create skill</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CreatableSelect
                      isClearable
                      isLoading={isLoadingSkill}
                      onChange={this.handleChange}
                      onCreateOption={this.handleCreate}
                      options={this.state.selectOptions}
                      value={value}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle>Search and create subskill</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CreatableSelect
                      isClearable
                      isLoading={isLoadingSubSkill}
                      onChange={this.handleChange2}
                      onCreateOption={this.handleCreate2}
                      options={this.state.selectOptionsSubSkill}
                      value={this.state.value2}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle>Create SubSkill</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <input
                      placeholder="Sub-Skill Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.changeHandler}
                    />
                    <p></p>
                    <input
                      placeholder="id"
                      type="number"
                      name="id"
                      value={this.state.id}
                      onChange={this.changeHandler}
                    />
                    <Button>go</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateSkill;
