import axios from "axios";

const addnote = async (title, content) => {
  try {
    console.log("noteservice:sending request to to backend to addnotee");
    const token = localStorage.getItem("token");
    console.log(
      "sending token saved in local storage to do note operation while making post request to backend servers ,token-",
      token
    );

    const response = await axios.post(
      "/api/notes/",
      {
        title,
        content,
        deletestatus: false,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    console.log("noteservice:response from server-", response.data);

    return {
      id: response.data.id,
      title: response.data.title,
      content: response.data.content,
      deletestatus: response.data.deletestatus,
    };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};
const deletenote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/api/notes/${id}`, {
      headers: {
        token: token,
      },
    });

    return response.data.message;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

const softdeletenote = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/api/notes/soft/${id}`, {
      headers: {
        token: token,
      },
    });

    return response.data.message;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

async function editnote(title, content, id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const response = await axios.put(
      `/api/notes/${id}`,
      {
        title,
        content,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.log("Edit failed!");

    throw new Error(error.message);
  }
}

export { addnote, softdeletenote, deletenote, editnote };
