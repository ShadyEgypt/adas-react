import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000");

export const uFilesAPI = {
  getFiles: async function (mongoId, page = 1, path) {
    try {
      const requestBody = {
        query: `
        query {
          uFiles(page: ${page}, filterKey: "${path}", userId: "${mongoId}") {
            id
            type
            key
            name
            num_files
          }
        }
      `,
      };
      const authToken = "123";
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const response = res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getFile: async function (userId, key, name) {
    try {
      const requestBody = {
        query: `
        query {
          uFile(userId: "${userId}", key: "${key}/", name: "${name}") {id, num_files}
        }
      `,
      };
      const authToken = "123";
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const response = res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  createFile: async function (uFileInput) {
    try {
      const mutation = gql`
        mutation createFile($uFileInput: uFileInput!) {
          addUfile(uFileInput: $uFileInput) {
            id
          }
        }
      `;
      const variables = { uFileInput };
      const { addUfile } = await client.request(mutation, variables);
      return addUfile;
    } catch (err) {
      console.log(err);
    }
  },
  changeNumFiles: async function (id, num_files) {
    try {
      const requestBody = {
        query: `
            mutation {
              updateUfile(updateUfileInput: {
                id: "${id}",
                num_files: ${num_files}
              }) {
                num_files
              }
            }
          `,
      };
      const authToken = "123";
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const response = res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  uploadFile: async function (userInputs) {
    try {
      const requestBody = {
        query: `
        mutation {
          addUfile(uFileInput: {
            userId: "${userInputs.userId}"
            type: "${userInputs.type}",
            key: "${userInputs.key}",
            name: "${userInputs.name}",
            num_files: 0
          }){
            id,
          }
        }
      `,
      };
      const authToken = "123";
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      await this.changeNumFiles(userInputs.parentId, userInputs.num_files);
      const response = res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteFile: async function (id, parentId, num_files) {
    try {
      const requestBody = {
        query: `
              mutation {
                deleteUfile(id: "${id}") {
                  id
                }
              }
            `,
      };
      const authToken = "123";
      const res = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      await this.changeNumFiles(parentId, num_files);

      const response = res.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getTree: function (username, name) {
    return [
      {
        id: 0,
        level: 0,
        key: "",
        name: `${username}`,
        dName: `${name}`,
        num_files: 3,
      },
      {
        id: 1,
        level: 1,
        key: `${username}/`,
        name: "images",
        dName: "images",
        num_files: 1,
      },
      {
        id: 2,
        level: 1,
        key: `${username}/`,
        name: "videos",
        dName: "videos",
        num_files: 1,
      },
      {
        id: 3,
        level: 1,
        key: `${username}/`,
        name: "results",
        dName: "results",
        num_files: 0,
      },
    ];
  },
  getTestTree: function (username, name, type) {
    if (type === "image") {
      return [
        {
          id: 0,
          level: 0,
          key: `${username}/`,
          name: "images",
          dName: "Your Images",
          num_files: 1,
        },
        {
          id: 1,
          level: 0,
          key: "BDD-dataset/images/100k/",
          name: "test",
          dName: "BDD Test Images",
          num_files: 20000,
        },
      ];
    } else {
      return [
        {
          id: 0,
          level: 0,
          key: `${username}/`,
          name: "videos",
          dName: "Your Videos",
          num_files: 1,
        },
        {
          id: 1,
          level: 0,
          key: "BDD-dataset/videos/",
          name: "test",
          dName: "BDD Test Videos",
          num_files: 20000,
        },
      ];
    }
  },
  createTree: async function (username, id) {
    let uFileInput;
    uFileInput = {
      userId: id,
      type: "folder",
      key: `${username}/`,
      name: "images",
      num_files: 0,
    };
    const res1 = await this.createFile(uFileInput);
    uFileInput = {
      userId: id,
      type: "folder",
      key: `${username}/`,
      name: "videos",
      num_files: 0,
    };
    const res2 = await this.createFile(uFileInput);
    uFileInput = {
      userId: id,
      type: "folder",
      key: `${username}/`,
      name: "results",
      num_files: 2,
    };
    const res3 = await this.createFile(uFileInput);
    uFileInput = {
      userId: id,
      type: "folder",
      key: "/",
      name: `${username}`,
      num_files: 3,
    };
    const res4 = await this.createFile(uFileInput);
    uFileInput = {
      userId: id,
      type: "folder",
      key: `${username}/results/`,
      name: "yolov2",
      num_files: 0,
    };
    const res5 = await this.createFile(uFileInput);
    uFileInput = {
      userId: id,
      type: "folder",
      key: `${username}/results/`,
      name: "yolov8",
      num_files: 0,
    };
    const res6 = await this.createFile(uFileInput);
    return "File tree created successfully!";
  },
};
