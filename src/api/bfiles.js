export const bFilesAPI = {
  getFiles: async function (page = 1, path) {
    try {
      const requestBody = {
        query: `
      query {
        bFiles(page: ${page}, filterKey: "${path}") {
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
  getTree: function () {
    return [
      {
        id: 0,
        level: 0,
        key: "BDD-dataset/",
        name: "",
        dName: "BDD data",
        num_files: 2,
      },
      {
        id: 1,
        level: 1,
        key: "BDD-dataset/",
        name: "images",
        dName: "images",
        num_files: 1,
      },
      {
        id: 2,
        level: 2,
        key: "BDD-dataset/images/",
        name: "100k",
        dName: "100k",
        num_files: 3,
      },
      {
        id: 3,
        level: 3,
        key: "BDD-dataset/images/100k/",
        name: "train",
        dName: "train",
        num_files: 70000,
      },
      {
        id: 4,
        level: 3,
        key: "BDD-dataset/images/100k/",
        name: "test",
        dName: "test",
        num_files: 20000,
      },
      {
        id: 5,
        level: 3,
        key: "BDD-dataset/images/100k/",
        name: "val",
        dName: "val",
        num_files: 10000,
      },
      {
        id: 6,
        level: 1,
        key: "BDD-dataset/",
        name: "videos",
        dName: "videos",
        num_files: 1,
      },
      {
        id: 7,
        level: 2,
        key: "BDD-dataset/videos/",
        name: "test",
        dName: "test",
        num_files: 0,
      },
    ];
  },
};
