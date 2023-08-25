import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as contactAction from "./actions/contactAction";

class Contact extends Component<
  any,
  {
    data: {
      available: boolean;
    };
    addForm: {
      visible: boolean;
      text: string;
    };
    formData: {
      index: number | null;
      fname: string;
      lname: string;
      status: string;
    };
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = this.resetState(this.props.contacts.length > 0 ? true : false);
  }
  //reset state to 0
  resetState(availability: boolean) {
    return {
      data: {
        available: availability,
      },
      addForm: {
        visible: false,
        text: "",
      },
      formData: {
        index: null,
        fname: "",
        lname: "",
        status: "",
      },
    };
  }

  deleteContact(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    this.props.deleteContact(index);
    if (this.props.contacts.length <= 1) this.setState(this.resetState(false));
  }

  //table generator for contact data
  listView(
    data: { fname: string; lname: string; status: string },
    index: number
  ) {
    return (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
      >
        <td key={`fname_${index}`} className="px-6 py-4">
          {data.fname}
        </td>
        <td key={`lname_${index}`} className="px-6 py-4">
          {data.lname}
        </td>
        <td key={`status_${index}`} className="px-6 py-4">
          {data.status}
        </td>
        <td key={`action_${index}`} className="px-6 py-4">
          <button
            className="font-medium text-white bg-blue-600 dark:bg-blue-500 p-2 rounded-md"
            onClick={(e) => {
              this.setState((previousState) => {
                return {
                  data: {
                    available: previousState.data.available,
                  },
                  addForm: {
                    visible: true,
                    text: "Edit Contact",
                  },
                  formData: {
                    index: index,
                    fname: "",
                    lname: "",
                    status: "",
                  },
                };
              });
            }}
          >
            Edit
          </button>
          <button
            className="font-medium ml-11 text-white bg-red-700 dark:bg-red-600 p-2 rounded-md"
            onClick={(e) => this.deleteContact(e, index)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  //form submit
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let elements = e.currentTarget.querySelectorAll("input");
    let fname = elements[0].value;
    let lname = elements[1].value;
    let status =
      elements[2].checked === true
        ? elements[2].value
        : elements[3].checked === true
        ? elements[3].value
        : "";
    if (fname === "" || fname === undefined || fname === null)
      alert("Enter First Name");
    else if (lname === "" || lname === undefined || lname === null)
      alert("Enter Last Name");
    else if (status === "" || status === undefined || status === null)
      alert("Select Status");
    else {
      let contact = {
        fname: fname,
        lname: lname,
        status: status,
      };

      if (this.state.addForm.text === "Add Contact")
        this.props.createContact(contact);
      else if (
        this.state.addForm.text === "Edit Contact" &&
        this.state.formData.index != null
      )
        this.props.editContact(this.state.formData.index, contact);

      elements[0].value = "";
      elements[1].value = "";
      elements[2].checked = false;
      elements[3].checked = false;
      this.setState(this.resetState(true));
    }
  }

  render(): React.ReactNode {
    return (
      <div className="container">
        {/* Add/Edit Form */}
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`grid fixed !top-1/4 justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
            this.state.addForm.visible === false ? "hidden" : ""
          }`}
        >
          <div
            className="relative w-full max-w-md max-h-full"
            style={{ minWidth: "320px" }}
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  this.setState((previousState) => {
                    return this.resetState(previousState.data.available);
                  });
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  {this.state.addForm.text}
                </h3>
                <form
                  className="space-y-6"
                  method="post"
                  action="#"
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <div>
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="name"
                      name="fname"
                      id="fname"
                      maxLength={20}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="name"
                      name="lname"
                      id="lname"
                      maxLength={20}
                      placeholder="Enter Last Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-start flex-1">
                      <div className="flex items-center h-5 flex-row justify-between flex-1">
                        <label
                          htmlFor="status"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Status:
                        </label>
                        <label
                          htmlFor="active"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Active
                        </label>
                        <input
                          id="active"
                          type="radio"
                          value="Active"
                          name="status"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                        />
                        <label
                          htmlFor="inactive"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          InActive
                        </label>
                        <input
                          id="inactive"
                          type="radio"
                          value="InActive"
                          name="status"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {this.state.addForm.text}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Form End */}

        {this.state.data.available === false ? (
          <div className="md:flex-1">
            <div className="container text-black p-24 text-center">
              <p className="text-6xl my-24">
                <strong>No Contacts to Display.</strong>
              </p>
              <button
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="rounded-full hover:bg-green-600 bg-green-500 text-white p-3"
                onClick={() => {
                  this.setState((previousState) => {
                    return {
                      data: {
                        available: previousState.data.available,
                      },
                      addForm: {
                        visible: true,
                        text: "Add Contact",
                      },
                      formData: {
                        index: null,
                        fname: "",
                        lname: "",
                        status: "",
                      },
                    };
                  });
                }}
              >
                Add Contact
              </button>
            </div>
          </div>
        ) : (
          <div className="container lg:w-3/4 sm:w-4/5 max-sm:w-screen py-20">
            <button
              className="hover:bg-green-600 bg-green-500 text-white p-3 rounded-lg mb-12"
              onClick={() => {
                this.setState((previousState) => {
                  return {
                    data: {
                      available: previousState.data.available,
                    },
                    addForm: {
                      visible: true,
                      text: "Add Contact",
                    },
                    formData: {
                      index: null,
                      fname: "",
                      lname: "",
                      status: "",
                    },
                  };
                });
              }}
            >
              Add Contact
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.contacts.map((contact: any, i: number) =>
                    this.listView(contact, i)
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//mapping state to props of class
const mapStateToProps = (state: {
  contacts: { fname: string; lname: string; status: string };
}) => {
  return {
    contacts: state.contacts,
  };
};

//dispatching events
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createContact: (contact: {
      fname: string;
      lname: string;
      status: string;
    }) => dispatch(contactAction.createContact(contact)),
    editContact: (
      index: number,
      contact: {
        fname: string;
        lname: string;
        status: string;
      }
    ) => dispatch(contactAction.editContact(index, contact)),
    deleteContact: (index: number) =>
      dispatch(contactAction.deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
