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
  value: ""
});
const apiFacadeGetDataSkill = async () => {
  return new Promise((resolve, reject) => {
    apiFacade
      .getData(`skill/${localStorage.getItem("decoded")}`)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createUpdate = async (newOption, config) => {
  try {
    const resultOfPost = await axios.post(
      "https://localhost:5001/api/skill",
      {
        name: newOption.label,
        clientid: parseInt(localStorage.getItem("decoded"))
      },
      config
    );
    console.log("resultOfPost: ", resultOfPost);

    let data = await apiFacadeGetDataSkill();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const apiFacadeGetDataSubSkill = async newSkillid => {
  return new Promise((resolve, reject) => {
    apiFacade
      .getData(`subskill/${localStorage.getItem("decoded")}/${newSkillid}`)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createUpdateSubSkill = async (newOption, config, newSkillid) => {
  try {
    const resultOfPost = await axios.post(
      "https://localhost:5001/api/subskill",
      {
        name: newOption.label,
        clientid: parseInt(localStorage.getItem("decoded")),
        skillid: newSkillid
      },
      config
    );
    console.log("resultOfPost: ", resultOfPost);

    let data = await apiFacadeGetDataSubSkill(newSkillid);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

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
    apiFacade
      .getData(`skill/${localStorage.getItem("decoded")}`)
      .then(response => {
        console.log(response);
        const selectOptions = response.map(item => ({
          value: item.id,
          label: item.name
        }));
        this.setState({ selectOptions });
      });
  }

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
    if (this.state.value2 != "") {
      this.setState({
        value2: ""
      });
    }
    if (newValue != null) {
      apiFacade
        .getData(
          `subskill/${localStorage.getItem("decoded")}/${newValue.value}`
        )

        .then(response => {
          const selectOptionsSubSkill = response.map(item => ({
            value: item.id,
            label: item.name
          }));
          console.log(response);
          console.log(newValue.value);
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
    if (this.state.value2 != null) {
      this.setState({
        value2: ""
      });
    }
    createUpdate(newOption, config).then(response => {
      console.log(response);
      const newselectOptions = response.map(item => ({
        value: item.id,
        label: item.name
      }));
      console.log(newselectOptions);
      console.log("Inden loop");
      for (let index = 0; index < newselectOptions.length; index++) {
        console.log("Inden i loop");
        if (newselectOptions[index].label === newOption.label) {
          console.log("Inden i IF");
          console.log(newselectOptions[index].value);
          newOption.value = newselectOptions[index].value;
          console.log(newOption);
          console.log(newselectOptions[index].value);

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
      response => {
        const selectOptionsSubSkill = response.map(item => ({
          value: item.id,
          label: item.name
        }));
        console.log(response);
        console.log(newOption);
        console.log(selectOptionsSubSkill);
        this.setState({ selectOptionsSubSkill: selectOptionsSubSkill });
        console.log("før loop");
        for (let index = 0; index < selectOptionsSubSkill.length; index++) {
          console.log("inde i loop");
          console.log(selectOptionsSubSkill[index].label);
          if (selectOptionsSubSkill[index].label === newOption.label) {
            console.log("inde i if");
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
    const { isLoadingSkill, isLoadingSubSkill, value, value2 } = this.state;
    return (
      <div>
        <Panelheader size="sm" />
        <div className="content">
          <form>
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
                      value={value2}
                    />
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
